async function authenticateUser(username, password) {
  try {
    const result = await trickleListObjects('user', 100, true);
    const user = result.items.find(item => 
      item.objectData.username === username && 
      item.objectData.password === password
    );
    
    if (user) {
      return {
        id: user.objectId,
        username: user.objectData.username,
        role: user.objectData.role,
        fullName: user.objectData.fullName,
        email: user.objectData.email,
        avatar: user.objectData.avatar
      };
    }
    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

function getCurrentUser() {
  const userStr = sessionStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

function logout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}