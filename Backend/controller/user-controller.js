import User from '../schema/user-schema.js';
//add user
export const addUser = async (request, response) => {
  const formData = request.body;
  const newUser = new User(formData);

  try {
    await newUser.save();
    response.status(201).json(newUser);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
//get data
export const getUsers = async (request, response) => {
  try {
    const users = await User.find();
    response.status(200).json(users);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};


// Add this delete function
export const deleteUser = async (request, response) => {
  try {
    await User.deleteOne({ _id: request.params.id });  
    response.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
export const updateUser = async (request, response) => {
  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(200).json(user);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
export const getUser = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) return response.status(404).json({ message: 'Course not found' });
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
// New function to get course by courseId
export const getUserByCourseId = async (request, response) => {
  const { courseId } = request.params;

  try {
    const user = await User.findOne({ courseId });
    if (!user) {
      return response.status(404).json({ message: 'Course not found' });
    }
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ message: 'Error fetching course', error: error.message });
  }
};