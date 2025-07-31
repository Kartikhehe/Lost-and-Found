import { useAuth } from '../../context/AuthContext';

const WelcomeMessage = ({ itemCount, showMyItems }) => {
  const { isLoggedIn, user } = useAuth();

  const getWelcomeMessage = () => {
    if (!isLoggedIn) {
      return {
        title: "Welcome to Lost & Found Portal! 🔍",
        subtitle: "Help reunite people with their lost items",
        description: "Browse through found items or report something you've lost. Login to post your own items and help the community!"
      };
    }

    if (showMyItems) {
      if (itemCount === 0) {
        return {
          title: `Welcome back, ${user?.username}! 👋`,
          subtitle: "You haven't posted any items yet",
          description: "Start by reporting a lost item or posting something you've found. Every post helps someone!"
        };
      } else {
        return {
          title: `Your Items Dashboard 📋`,
          subtitle: `You have ${itemCount} item${itemCount !== 1 ? 's' : ''} posted`,
          description: "Manage your lost and found items. You can edit or delete your posts anytime."
        };
      }
    }

    return {
      title: `Welcome back, ${user?.username}! 🎉`,
      subtitle: "Ready to help the community?",
      description: itemCount === 0 
        ? "No items found matching your search. Be the first to post something!" 
        : `Browsing ${itemCount} item${itemCount !== 1 ? 's' : ''} in the community. Item not found? Post it now!`
    };
  };

  const message = getWelcomeMessage();

  return (
    <div className="text-center py-8 mb-8">
      <div className="bg-white bg-opacity-90 rounded-lg p-6 max-w-2xl mx-auto shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {message.title}
        </h1>
        <h2 className="text-xl text-gray-600 mb-3">
          {message.subtitle}
        </h2>
        <p className="text-gray-700 text-lg">
          {message.description}
        </p>
        
        {!isLoggedIn && (
          <div className="mt-4 space-x-4">
            <a 
              href="/login" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login to Post Items
            </a>
            <a 
              href="/register" 
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Create Account
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeMessage;

