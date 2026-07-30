import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {isSidebarOpen = false;

  constructor(private router: Router) {}

  // Toggle sidebar (mobile)
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Close sidebar
  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  // Automatically close sidebar when switching to desktop
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768) {
      this.isSidebarOpen = false;
    }
  }

  logout(): void {

    this.closeSidebar();

    localStorage.removeItem('user');

    this.router.navigate(['/']);

  }


  
}
