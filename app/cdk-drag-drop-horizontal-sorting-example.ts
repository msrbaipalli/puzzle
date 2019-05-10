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
export class CdkDragDropHorizontalSortingExample implements OnInit {
  puzzleObject = [];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.addRow();
    this.addRow();
    this.addRow();

    this.shuffleElements();
  }

  drop(event: CdkDragDrop<string[]>, row) {
    moveItemInArray(row, event.previousIndex, event.currentIndex);
    this.checkForMatch();
  }

  checkForMatch() {
    if (false) {
      this.snackBar.open('You made it!', '', {
        duration: 3000,
      });
    }
  }

  shuffleElements() {
    this.puzzleObject.forEach(item => {
      item.row = this.suffle(item.row);
    });
  }

  addRow() {
    this.puzzleObject.push(
      {
        row: [
          this.getRandomColor(),
          this.getRandomColor(),
          this.getRandomColor(),
          this.getRandomColor()
        ]
      }
    );

    this.shuffleElements();
  }

  addColumn() {
    this.puzzleObject.forEach(item => {
      item.row.push(this.getRandomColor());
    });

    this.shuffleElements();
  }

  private getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

  private suffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }
}