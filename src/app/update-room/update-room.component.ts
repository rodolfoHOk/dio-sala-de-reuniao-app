import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css'],
})
export class UpdateRoomComponent implements OnInit {
  id: number | undefined;
  room: Room | undefined;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService
  ) {}

  ngOnInit(): any {
    this.room = new Room();
    this.id = this.route.snapshot.params['id'];
    this.roomService.getRoom(this.id).subscribe(
      (data: Room | undefined) => {
        console.log(data);
        this.room = data;
      },
      (error: any) => console.log(error)
    );
  }

  updateRoom() {
    this.roomService.updateRoom(this.id, this.room).subscribe(
      (data: any) => console.log(data),
      (error: any) => console.log(error)
    );
    this.room = new Room();
    this.goToList();
  }

  goToList() {
    this.router.navigate(['/rooms']);
  }
}
