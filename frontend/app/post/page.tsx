import React from "react";
import CreatePost from "../components/createpost";

const CreatePostPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-3xl p-8 md:p-10 transition-transform transform hover:scale-[1.01] duration-300">

        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-extrabold text-red-600">
            Create a Post
          </h1>
          <p className="text-gray-500 text-lg">
            Share with your community.
          </p>
        </div>

        {/* CreatePost Form */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CreatePost />
        </div>

      </div>
    </div>
  );
};

export default CreatePostPage;

