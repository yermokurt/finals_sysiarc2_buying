/**
 * auth_guard.js - Session security and role-based access control
 */

const AuthGuard = {
    check() {
        const session = JSON.parse(localStorage.getItem('it3b_session'));
        const currentPage = window.location.pathname;

        // Skip check for login page
        if (currentPage.endsWith('login.html')) return;

        if (!session) {
            this.redirect('login.html');
            return;
        }

        // Role-based path guarding
        const isBuyingPage = currentPage.includes('/buying/');
        const isAdminPage = currentPage.endsWith('admin_dashboard.html');

        if (session.role === 'user' && isAdminPage) {
            this.redirect('buying/buying.html');
        }

        if (session.role === 'admin' && isBuyingPage) {
            // Admins can access buying pages usually, but if we want to force them to admin hub first:
            // this.redirect('admin_dashboard.html');
        }
    },

    redirect(page) {
        let prefix = window.location.pathname.includes('/buying/') ? '../' : '';
        window.location.href = prefix + page;
    },

    logout() {
        localStorage.removeItem('it3b_session');
        this.redirect('login.html');
    }
};

// Auto check on load
document.addEventListener('DOMContentLoaded', () => AuthGuard.check());

window.AuthGuard = AuthGuard;
