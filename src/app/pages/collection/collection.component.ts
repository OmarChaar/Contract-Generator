import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { OptionsDialogComponent } from 'src/app/components/options-dialog/options-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromptComponent } from 'src/app/components/prompt/prompt.component';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { SessionStorageService } from 'src/app/services/sessionStorage/session-storage.service';

interface Section {
  id: string;
  label: string;
  description: string;
  show: boolean;
  questions: Question[],
  expanded: boolean
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
  public isSearching = false;

  public optionsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  public isExpanding = false;

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
    { id: uuidv4(), label: '', show: true, description: '', questions: [JSON.parse(JSON.stringify(this.emptyQuestion))], expanded: false },
    { id: uuidv4(), label: '', show: true, description: '', questions: [JSON.parse(JSON.stringify(this.emptyQuestion))], expanded: false  },
    { id: uuidv4(), label: '', show: true, description: '', questions: [JSON.parse(JSON.stringify(this.emptyQuestion))], expanded: false  }
  ];

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private sessionStorageService: SessionStorageService
    ) { }

  ngOnInit(): void {
    if(this.sessionStorageService.getSessionStorage('sections') != null) {
      this.sections = this.sessionStorageService.getSessionStorage('sections');
      this.collapseAll();
    }
  }

  addSection() {
    const newRow: Section = {
      id: uuidv4(),
      label: '',
      show: true,
      description: '',
      questions: [this.emptyQuestion],
      expanded: false
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
    if(question.type != null) {
      const dialogRef = this.dialog.open(OptionsDialogComponent, {
        data: {
          question: question,
        }
      });

      dialogRef.afterClosed().subscribe((result: Options[]) => {
        if(result) {
          question.options = result;
        }

      });
    }
    else {
      document.getElementById('type_'+question.id)?.classList.add('errorValidation');
      this.openSnackBar('You have to select a type first', 'Warning');
    }

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
    if(this.validateSections() == true) {
      this.sessionStorageService.setSessionStorage('sections', this.sections)
    }
    else {
      this.expandAll();
      this.hasErrors = true;
    }
  }

  validateSections() {
    for(let i=0; i<this.sections.length; i++) {
      const tempSection = this.sections[i];
      if(tempSection.label?.trim().length > 0) {
        for(let x=0; x<tempSection.questions.length; x++) {
          const tempQuestion = tempSection.questions[x];

          if(!(tempQuestion.label?.trim().length > 0 &&
            tempQuestion.displayLabel?.trim().length > 0 &&
            tempQuestion.options.length > 0 &&
            tempQuestion.enabled != null &&
            tempQuestion.required != null) ) {
              return false;
          }
        }
      }
      else {
        return false;
      }
    }

    return true;
  }

  toggle(id: string, currentSection: Section) {
    if(this.isExpanding) {
      currentSection.expanded = !currentSection.expanded;
    }
    else {
      for(let section of this.sections) {
        if(section.id != id) {
          section.expanded = false;
        }
        else {
          section.expanded = !section.expanded;
        }
      }
    }


  }

  public searchResults: any;

  search(event: any) {
    this.isSearching = true;
    this.expandAll();

    if(event.target.value.length > 0) {
      const searchBy: string = event.target.value;
      let tempSearched: Section[] = [];
      for(let section of this.sections) {
        if(section.label.toLowerCase().indexOf(searchBy.toLowerCase()) > -1) {
          tempSearched.push(section);
        }
        else {
          let tempSection: Section = JSON.parse(JSON.stringify(section));
          tempSection.questions = [];
          let hasFound = false;
          for(let question of section.questions) {
            if(question.label?.toLowerCase().indexOf(searchBy.toLowerCase()) > -1) {
              hasFound = true;
              tempSection.questions.push(question);
            }
          }

          if(hasFound) {
            tempSearched.push(tempSection);
          }
        }
      }
      this.searchResults = tempSearched;
    }
    else {
      this.isSearching = false;
    }
  }

  clearSearch() {
    this.searchValue = '';
    this.isSearching = false;
  }

  expandAll() {
    this.isExpanding = true;
    for(let section of this.sections) {
      section.expanded = true;
    }
  }

  collapseAll() {
    this.isExpanding = false;
    for(let section of this.sections) {
      section.expanded = false;
    }
  }

  triggerType(event: any, id: string, question: Question, sectionIndex: number, index: number) {
    if(this.selectedCurrentType != event) {
      console.log("triggerType", event, question, this.selectedCurrentType);
      const dialogRef = this.dialog.open(PromptComponent, {
        data: {
          message: 'Changing the type will remove all existing options. Are you sure you want to proceed?',
          title: 'Changing Type'
        }
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        console.log("result", result);

      });
    }

    document.getElementById('type_'+id)?.classList.remove('errorValidation');
  }

  private selectedCurrentType: string = '';

  openType(question: Question) {
    if(question.type) {
      this.selectedCurrentType = question.type;
    }
  }

}
