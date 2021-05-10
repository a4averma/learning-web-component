import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import "./components/app-header";
import "./components/app-footer";

type ToDoItem = {
  text: string;
  completed: boolean;
};

@customElement("my-element")
class MyElement extends LitElement {
  @property({ attribute: false })
  listItems = [
    { text: "Start Lit tutorial", completed: true },
    { text: "Make to-do list", completed: false },
  ];

  static get styles() {
    return css`
      .cursor-pointer {
        cursor: pointer;
      }
      .completed {
        text-decoration-line: line-through;
        color: #777;
      }
    `;
  }

  @query("#newitem")
  input!: HTMLInputElement;

  addToDo() {
    this.listItems.push({ text: this.input.value, completed: false });
    this.requestUpdate();
    this.input.value = "";
  }

  @property()
  hideCompleted = false;

  toggleCompleted(item: ToDoItem) {
    item.completed = !item.completed;
    this.requestUpdate();
  }

  setHideCompleted(e: Event) {
    this.hideCompleted = (e.target as HTMLInputElement).checked;
  }

  render() {
    const items = this.hideCompleted
      ? this.listItems.filter((item) => !item.completed)
      : this.listItems;
    const caughtUpMessage = html` <p>You're all caught up!</p> `;
    const todos = html`
      <ul>
        ${items.map(
          (item) =>
            html` <li
              class=${`cursor-pointer ${item.completed ? "completed" : ""}`}
              @click=${() => this.toggleCompleted(item)}
            >
              ${item.text}
            </li>`
        )}
      </ul>
    `;
    const todosOrMessage = items.length > 0 ? todos : caughtUpMessage;
    return html`
      <app-header></app-header>
      ${todosOrMessage}
      <input id="newitem" aria-label="New item" />
      <button @click=${this.addToDo}>Add</button>
      <br />
      <label>
        <input
          type="checkbox"
          @change=${this.setHideCompleted}
          ?checked=${this.hideCompleted}
        />
        Hide completed
      </label>
      <app-footer></app-footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
