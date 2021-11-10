import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent implements OnInit {
  id: number | undefined;
  room: Room | undefined;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.room = new Room();
    this.id = this.route.snapshot.params['id'];
    this.roomService.getRoom(this.id!).subscribe({
      next: (data) => {
        console.log(data);
        this.room = data;
      },
      error: (error) => console.log(error),
    });
  }

  list() {
    this.router.navigate(['/rooms']);
  }
}
