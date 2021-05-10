import { customElement, property } from "lit/decorators.js";
import { LitElement, html } from "lit";

@customElement("app-footer")
class AppFooter extends LitElement {
  @property()
  message: string = "Copyright Pepehands";
  render() {
    return html` <footer>${this.message}</footer> `;
  }
}
