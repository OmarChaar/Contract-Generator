import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MatAccordion} from '@angular/material/expansion';
import { FormControl, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { OptionsDialogComponent } from 'src/app/components/options-dialog/options-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PromptComponent } from 'src/app/components/prompt/prompt.component';
import { CdkAccordionItem } from '@angular/cdk/accordion';

interface Section {
  id: string;
  label: string;
  description: string;
  show: boolean;
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
  show: boolean
}

interface Options {
  value: any,
  label: any,
  name: any,
  price: any,
  link: any
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {

  searchValue: any;

  public optionsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expandedIndex = 0;

  expandedItems: boolean[] = [];

  private emptyQuestion: Question = {
    id: uuidv4(),
    label: null,
    displayLabel: null,
    type: null,
    options: null,
    required: null,
    enabled: null,
    show: true
  };

  sections: Section[] = [
    { id: uuidv4(), label: '', show: true, description: '', questions: [JSON.parse(JSON.stringify(this.emptyQuestion))] },
    { id: uuidv4(), label: '', show: true, description: '', questions: [JSON.parse(JSON.stringify(this.emptyQuestion))]  },
    { id: uuidv4(), label: '', show: true, description: '', questions: [JSON.parse(JSON.stringify(this.emptyQuestion))]  }
  ];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.expandedItems = this.sections.map(() => false);
  }

  addSection() {
    const newRow: Section = {
      id: uuidv4(),
      label: '',
      show: true,
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

  openDialog(question: Question) {
    const dialogRef = this.dialog.open(OptionsDialogComponent, {
      data: {
        question: question,
      }
    });

    dialogRef.afterClosed().subscribe((result: Options[]) => {
      console.log("result", result);
      if(result) {
        question.options = result;
      }

    });
  }

  openPrompt(message: string) {

  }

  addQuestion(section: Section) {
    const emptyQuestion: Question = {
      id: uuidv4(),
      label: null,
      displayLabel: null,
      type: null,
      options: null,
      required: null,
      enabled: null,
      show: true
    };

    section.questions.push(emptyQuestion);
  }

  deleteSection(i: number) {
    if(this.sections.length > 1) {
      const dialogRef = this.dialog.open(PromptComponent, {
        data: {
          message: 'Are you sure you want to delete this section?',
          title: 'Deleting Section'
        }
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if(result == true) {
          this.sections.splice(i, 1);
        }

      });
    }
    else {
      this.openSnackBar('You have have at least 1 section', 'Warning');
    }
  }

  cloneSection(section: Section) {
    let clonedSecction: Section = JSON.parse(JSON.stringify(section));
    clonedSecction.id = uuidv4();
    clonedSecction.label = clonedSecction.label + ' - cloned'
    this.sections.push(clonedSecction);
  }

  hideSection(i: number) {
    this.sections[i].show = !this.sections[i].show
  }


  deleteQuestion(section: Section, i: number) {
    if(section.questions.length > 1) {
      const dialogRef = this.dialog.open(PromptComponent, {
        data: {
          message: 'Are you sure you want to delete this question?',
          title: 'Deleting Question'
        }
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if(result == true) {
          section.questions.splice(i, 1);
        }

      });
    }
    else {
      this.openSnackBar('You have have at least 1 question', 'Warning');
    }
  }

  cloneQuestion(section: Section, question: Question) {
    let clonedQuestion: Question = JSON.parse(JSON.stringify(question));
    clonedQuestion.id = uuidv4();
    clonedQuestion.label = clonedQuestion.label + ' - cloned'
    section.questions.push(clonedQuestion);
  }

  transferQuestion(section: Section, i: number, question: Question, transferId: any) {
    if(section.questions.length > 1) {
      let clonedQuestion: Question = JSON.parse(JSON.stringify(question));
      const transferIndex = this.getSectionByID(transferId);
      if(transferIndex > -1) {
        this.sections[this.getSectionByID(transferId)].questions.push(clonedQuestion);
        section.questions.splice(i, 1);
      }
    }
    else {
      this.openSnackBar('You have have at least 1 question per section', 'Warning');
    }

  }

  getSectionByID(id: any) {
    for(let i=0; i<this.sections.length; i++) {
      if(this.sections[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  hideQuestion(question: Question) {
    question.show = !question.show;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  public hasErrors = false;

  save() {
    console.log("SAVE ", this.sections);
    if(this.validateSections() == true) {
      console.log("SAVING...s");
    }
    else {
      this.hasErrors = true;
    }
  }

  validateSections() {
    for(let i=0; i<this.sections.length; i++) {
      const tempSection = this.sections[i];
      if(tempSection.label?.trim().length > 0) {

      }
      else {
        return false;
      }
    }

    return true;
  }

  public isSearching = false;

  @ViewChildren(CdkAccordionItem) accordionItems: QueryList<CdkAccordionItem> | undefined;

  search(event: any) {
    if( this.accordionItems) {
      console.log("accordionItems", this.accordionItems);
      this.accordionItems.forEach(item => {item.expanded = true; console.log("item", item);});
    }


    this.isSearching = true;
    // this.expandAll();

    console.log(event.target.value);
    if(event.target.value.length > 0) {
      const searchBy: string = event.target.value;
      let tempSearched: Section[] = [];
      for(let section of this.sections) {
        if(section.label.toLowerCase().includes(searchBy.toLowerCase())) {
          tempSearched.push(section);
        }
        else {
          let tempSection: Section = JSON.parse(JSON.stringify(section));
          tempSection.questions = [];
          let hasFound = false;
          for(let question of section.questions) {
            if(question.label?.toLowerCase().includes(searchBy.toLowerCase())) {
              hasFound = true;
              tempSection.questions.push(question);
            }
          }

          if(hasFound) {
            tempSearched.push(tempSection);
          }
        }
      }

      console.log("tempSearched", tempSearched);
    }
    else {

    }
  }

  clearSearch() {
    this.searchValue = '';
  }

  expandAll() {
    this.expandedItems = this.sections.map(() => true);
  }

  collapseAll() {
    this.expandedItems = this.sections.map(() => false);
  }
}
