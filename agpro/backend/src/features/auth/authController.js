import { registerUser, loginUser, getProfileService } from './authService.js';

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
    const user = await registerUser({ email, password });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(400).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    const { token, user } = await loginUser({ email, password });

    res.status(200).json({ token, user });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getProfileUser(req, res) {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    const user = await getProfileService(req.user.userId);
    res.json({ user });
  } catch (err) {
    console.error('Error in getProfileUser:', err);
    res.status(err.message === 'User not found' ? 404 : 500)
       .json({ message: err.message });
  }
}
