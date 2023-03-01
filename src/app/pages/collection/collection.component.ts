import { Component, OnInit, ViewChild } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MatAccordion} from '@angular/material/expansion';
import { FormControl, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { OptionsDialogComponent } from 'src/app/components/options-dialog/options-dialog.component';

interface Section {
  id: string;
  label: string;
  description: string;
  questions: Question[]
}

interface Question {
  id: string,
  label: any,
  displayLabel: any,
  type: any,
  options: any,
  required: any,
  enabled: any,
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {

  public optionsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expandedIndex = 0;

  private emptyQuestion: Question = {
    id: uuidv4(),
    label: null,
    displayLabel: null,
    type: null,
    options: null,
    required: null,
    enabled: null,
  };

  sections: Section[] = [
    { id: uuidv4(), label: '', description: '', questions: [this.emptyQuestion] },
    { id: uuidv4(), label: '', description: '', questions: [this.emptyQuestion]  },
    { id: uuidv4(), label: '', description: '', questions: [this.emptyQuestion]  }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addSection() {
    const newRow: Section = {
      id: uuidv4(),
      label: '',
      description: '',
      questions: [this.emptyQuestion]
    };
    this.sections.push(newRow);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }

  dropQuestion(event: CdkDragDrop<string[]>, section: Section) {
    moveItemInArray(section.questions, event.previousIndex, event.currentIndex);
  }

  addQuestion(section: Section) {
    const emptyQuestion: Question = {
      id: uuidv4(),
      label: null,
      displayLabel: null,
      type: null,
      options: null,
      required: null,
      enabled: null
    };

    section.questions.push(emptyQuestion);
  }

  openDialog(section: Section, question: Question) {
    const dialogRef = this.dialog.open(OptionsDialogComponent, {
      data: {
        question: question
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${(JSON.stringify(result))}`);
    });
  }

}
