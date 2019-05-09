import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material'

/**
 * @title Drag&Drop horizontal sorting
 */
@Component({
  selector: 'cdk-drag-drop-horizontal-sorting-example',
  templateUrl: 'cdk-drag-drop-horizontal-sorting-example.html',
  styleUrls: ['cdk-drag-drop-horizontal-sorting-example.css'],
})
export class CdkDragDropHorizontalSortingExample {
  row1 = [
    'red',
    'green',
    'yellow',
    'blue'
  ];

  row2 = [
    'red',
    'blue',
    'green',
    'yellow',
  ];

  row3 = [
    'blue',
    'red',
    'green',
    'yellow',
  ];

  row4 = [
    'red',
    'blue',
    'yellow',
    'green'
  ];

   row5 = [
    'red',
    'blue',
    'yellow',
    'green'
  ];

  row6 = [
    'red',
    'blue',
    'yellow',
    'green'
  ];

  constructor(private snackBar: MatSnackBar) {}

  $onInit() {
    this.shuffleElements();
  }

  drop(event: CdkDragDrop<string[]>, row) {
    moveItemInArray(row, event.previousIndex, event.currentIndex);
    this.checkForMatch();
  }

  checkForMatch() {
    if (this.row1.every((item, index) => item === this.row2[index]) &&
        this.row2.every((item, index) => item === this.row3[index]) && 
        this.row1.every((item, index) => item === this.row3[index])) {
      this.snackBar.open('You made it!', '', {
        duration: 3000,
      });
    }
  }

  shuffleElements() {
    this.row1 = this.shuffle(this.row1);
    this.row2 = this.shuffle(this.row2);
    this.row3 = this.shuffle(this.row3);
    this.row4 = this.shuffle(this.row4);
    this.row5 = this.shuffle(this.row5);
    this.row6 = this.shuffle(this.row6);
  }

  private shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}