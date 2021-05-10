import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import "./components/app-header";
import "./components/app-footer";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:4000`,
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
});

type ToDoItem = {
  text: string;
  _id: string;
  completed: boolean;
};

@customElement("my-element")
class MyElement extends LitElement {
  @property({ attribute: false })
  listItems = [];

  @property()
  loading = false;

  @property()
  error = false;

  async firstUpdated() {
    // Give the browser a chance to paint
    await new Promise(() => this.getData());
  }

  getData() {
    return axiosInstance
      .get(`/tasks/`)
      .then((r) => {
        this.listItems = r.data;
        this.loading = false;
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
      });
  }

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
    axiosInstance
      .post(`/tasks`, { text: this.input.value })
      .then((r) => {
        this.listItems.push({ text: this.input.value, completed: false });
        this.requestUpdate();
        this.input.value = "";
      })
      .catch(() => {
        this.requestUpdate();
        this.input.value = "Error";
      });
  }

  @property()
  hideCompleted = false;

  toggleCompleted(item: ToDoItem, index) {
    axiosInstance
      .put(`/task/${item._id}`, {
        ...item,
        completed: (item.completed = !item.completed),
      })
      .then((r) => {
        this.listItems[index].completed = !item.completed;
        this.requestUpdate();
      })
      .catch(() => {
        alert("Error");
      });
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
          (item, index) =>
            html` <li
              class=${`cursor-pointer ${item.completed ? "completed" : ""}`}
              @click=${() => this.toggleCompleted(item, index)}
            >
              ${item.text}
            </li>`
        )}
      </ul>
    `;
    const todosOrMessage = items.length > 0 ? todos : caughtUpMessage;
    if (this.loading) {
      return html` <p>Loading...</p> `;
    }
    if (this.error) {
      return html` <p>Jokes on you</p> `;
    }
    return html`
      <app-header></app-header>
      ${todosOrMessage}
      <input id="newitem" required aria-label="New item" />
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
