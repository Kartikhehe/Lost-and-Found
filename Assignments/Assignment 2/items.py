from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from src.models.user import db, User, Item

items_bp = Blueprint('items', __name__)

@items_bp.route('/', methods=['GET'])
def get_all_items():
    try:
        # Get query parameters for filtering
        status = request.args.get('status')  # 'found' or 'lost'
        category = request.args.get('category')
        search = request.args.get('search')
        user_id = request.args.get('user_id')  # For "My Items" filter
        
        # Build query
        query = Item.query
        
        if status and status != 'all':
            query = query.filter(Item.status == status)
        
        if category and category != 'all':
            query = query.filter(Item.category == category)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                (Item.name.ilike(search_term)) |
                (Item.location.ilike(search_term)) |
                (Item.description.ilike(search_term))
            )
        
        if user_id:
            query = query.filter(Item.user_id == user_id)
        
        # Order by most recent first
        items = query.order_by(Item.created_at.desc()).all()
        
        return jsonify({
            'items': [item.to_dict() for item in items],
            'count': len(items)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@items_bp.route('/', methods=['POST'])
@jwt_required()
def create_item():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'location', 'date_found_lost', 'contact_email', 'category', 'status']
        for field in required_fields:
            if not data or not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Parse date
        try:
            date_found_lost = datetime.strptime(data['date_found_lost'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        # Validate status
        if data['status'] not in ['found', 'lost']:
            return jsonify({'error': 'Status must be either "found" or "lost"'}), 400
        
        # Create new item
        new_item = Item(
            name=data['name'].strip(),
            description=data.get('description', '').strip(),
            location=data['location'].strip(),
            date_found_lost=date_found_lost,
            contact_email=data['contact_email'].strip(),
            image_url=data.get('image_url', '').strip(),
            category=data['category'].strip(),
            status=data['status'].strip(),
            user_id=current_user_id
        )
        
        db.session.add(new_item)
        db.session.commit()
        
        return jsonify({
            'message': 'Item created successfully',
            'item': new_item.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@items_bp.route('/<int:item_id>', methods=['GET'])
def get_item(item_id):
    try:
        item = Item.query.get(item_id)
        
        if not item:
            return jsonify({'error': 'Item not found'}), 404
        
        return jsonify({'item': item.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@items_bp.route('/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_item(item_id):
    try:
        current_user_id = get_jwt_identity()
        item = Item.query.get(item_id)
        
        if not item:
            return jsonify({'error': 'Item not found'}), 404
        
        # Check if user owns this item
        if item.user_id != current_user_id:
            return jsonify({'error': 'You can only update your own items'}), 403
        
        data = request.get_json()
        
        # Update fields if provided
        if 'name' in data:
            item.name = data['name'].strip()
        if 'description' in data:
            item.description = data['description'].strip()
        if 'location' in data:
            item.location = data['location'].strip()
        if 'date_found_lost' in data:
            try:
                item.date_found_lost = datetime.strptime(data['date_found_lost'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        if 'contact_email' in data:
            item.contact_email = data['contact_email'].strip()
        if 'image_url' in data:
            item.image_url = data['image_url'].strip()
        if 'category' in data:
            item.category = data['category'].strip()
        if 'status' in data:
            if data['status'] not in ['found', 'lost']:
                return jsonify({'error': 'Status must be either "found" or "lost"'}), 400
            item.status = data['status'].strip()
        
        item.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Item updated successfully',
            'item': item.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@items_bp.route('/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_item(item_id):
    try:
        current_user_id = get_jwt_identity()
        item = Item.query.get(item_id)
        
        if not item:
            return jsonify({'error': 'Item not found'}), 404
        
        # Check if user owns this item
        if item.user_id != current_user_id:
            return jsonify({'error': 'You can only delete your own items'}), 403
        
        db.session.delete(item)
        db.session.commit()
        
        return jsonify({'message': 'Item deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@items_bp.route('/my-items', methods=['GET'])
@jwt_required()
def get_my_items():
    try:
        current_user_id = get_jwt_identity()
        
        # Get query parameters for filtering
        status = request.args.get('status')  # 'found' or 'lost'
        category = request.args.get('category')
        search = request.args.get('search')
        
        # Build query for user's items only
        query = Item.query.filter(Item.user_id == current_user_id)
        
        if status and status != 'all':
            query = query.filter(Item.status == status)
        
        if category and category != 'all':
            query = query.filter(Item.category == category)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                (Item.name.ilike(search_term)) |
                (Item.location.ilike(search_term)) |
                (Item.description.ilike(search_term))
            )
        
        # Order by most recent first
        items = query.order_by(Item.created_at.desc()).all()
        
        return jsonify({
            'items': [item.to_dict() for item in items],
            'count': len(items)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@items_bp.route('/stats', methods=['GET'])
def get_stats():
    try:
        total_items = Item.query.count()
        found_items = Item.query.filter(Item.status == 'found').count()
        lost_items = Item.query.filter(Item.status == 'lost').count()
        
        # Category stats
        categories = db.session.query(Item.category, db.func.count(Item.id)).group_by(Item.category).all()
        category_stats = {category: count for category, count in categories}
        
        return jsonify({
            'total_items': total_items,
            'found_items': found_items,
            'lost_items': lost_items,
            'categories': category_stats
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

