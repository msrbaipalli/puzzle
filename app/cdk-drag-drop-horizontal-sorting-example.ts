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
  puzzleObject: any[];
  initialRow: any[];

  constructor(private snackBar: MatSnackBar) {
    this.puzzleObject = [];
    this.initialRow = [
      this.getRandomColor(),
      this.getRandomColor(),
      this.getRandomColor()
    ];
  }

  ngOnInit() {
    this.resetElements();
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

  resetElements() {
    this.puzzleObject = [];

    this.addRow();
    this.addRow();
    this.addRow();

    this.shuffleElements();
  }

  addRow() {
    const row = this.initialRow;

    this.puzzleObject.push(
      {
        row: Object.assign([], row)
      }
    );

    const rows = this.puzzleObject.length;
    const columns = this.puzzleObject[0].row.length;
    const difference = Math.abs(rows - columns);

    if (rows !== columns) {
        for (let i = difference; difference != 0; i--) {
            row.push(this.getRandomColor());
        }
    }

    this.shuffleElements();
  }

  addColumn() {
    const initialColumn = this.getRandomColor();
    this.puzzleObject.forEach(item => {
      item.row.push(initialColumn);
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