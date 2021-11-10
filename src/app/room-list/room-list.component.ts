import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms: Observable<Room[]> | undefined;

  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.rooms = this.roomService.getRoomsList();
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe({
      next: (data) => {
        console.log(data);
        this.reloadData();
      },
      error: (error) => console.log(error),
    });
  }

  roomDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  updateRoom(id: number) {
    this.router.navigate(['update', id]);
  }
}
