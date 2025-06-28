export default function useAuth() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return { isAuthenticated: !!token, role };
}