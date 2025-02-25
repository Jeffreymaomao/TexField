<p align='center'>
<a href='https://jeffreymaomao.github.io/TexField/dist/'>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./src/img/TexField.dark.png">
        <img alt="TexField Logo" src="./src/img/TexField.light.png" width='120'>
	</picture>
</a>
<br>
<h1 align='center'>TexField</h1>
</p>

**TexField** is a web application designed for creating and managing LaTeX notes on an infinitely large canvas. By leveraging [KaTeX](https://katex.org/) for LaTeX rendering, TexField enables fast and efficient display of mathematical formulas directly in your browser.


## Getting Started

**TexField** is an online web application. To start using it, simply visit [![play](https://img.shields.io/badge/play-start-red.svg?logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEiIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIj48cGF0aCBkPSJNMTI5IDExMWMtNTUgNC05MyA2Ni05MyA3OEwwIDM5OGMtMiA3MCAzNiA5MiA2OSA5MWgxYzc5IDAgODctNTcgMTMwLTEyOGgyMDFjNDMgNzEgNTAgMTI4IDEyOSAxMjhoMWMzMyAxIDcxLTIxIDY5LTkxbC0zNi0yMDljMC0xMi00MC03OC05OC03OGgtMTBjLTYzIDAtOTIgMzUtOTIgNDJIMjM2YzAtNy0yOS00Mi05Mi00MmgtMTV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+)](https://jeffreymaomao.github.io/TexField/dist/)

<p align='center'>
    <img src='./assets/UI-main.png'>
</p>

## Usage / Shortcuts

| MathEditor Action            |       Method (mac OS)        |               Method (Windows)               |
| ---------------------------- | :--------------------------- | :------------------------------------------- |
| Toggle Block Editing mode    | <kbd>command</kbd> + <kbd>/</kbd> |        <kbd>Ctrl</kbd> + <kbd>/</kbd>        |
| Create New Block             | <kbd>return</kbd> |      <kbd>Enter</kbd>      |
| Delete Foucs Block           | <kbd>delete</kbd> |    <kbd>Backspace</kbd>    |
| Move focus Up / Down | <kbd>↑</kbd> or <kbd>↓</kbd> | <kbd>Up Arrow</kbd> or <kbd>Down Arrow</kbd> |
| Focus Block                  |            Click Block            |                    Click Block                    |

| TexField Action     | Method (mac OS)                                         | Method (Windows)                                  |
| ------------------- | :------------------------------------------------------ | :------------------------------------------------ |
| Move Canvas         | Scroll Wheel / Drag Canvas                              | Scroll Wheel / Drag Canvas                        |
| Add New Note        | Double Click                                            | Double Click                                      |
| Add Path Link       | <kbd>command</kbd> + <kbd>shift</kbd> + Drag Note       | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + Drag Note    |
| Focus Note          | <kbd>command</kbd> + Click Note                         | <kbd>Ctrl</kbd> + Click Note                      |
| Focus Path          | Click Path                                              | Click Path                                        |
| Move Note           | <kbd>command</kbd> + Drag Note                          | <kbd>Ctrl</kbd> + Drag Note                       |
| Center Note         | <kbd>command</kbd> + <kbd>option</kbd> + <kbd>1~9</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>1~9</kbd> |
| Delete Focused Note | Select Note ⇨ <kbd>delete</kbd>                         | Select Note ⇨ <kbd>Backspace</kbd>                |
| Delete Focused Note | Select Path ⇨ <kbd>delete</kbd>                         | Select Path ⇨ <kbd>Backspace</kbd>                |

| Global Action            | Method (mac OS)                                      | Method (Windows)                                  |
| ------------------------ | ---------------------------------------------------- | ------------------------------------------------- |
| Toggle Dark / Light mode | <kbd>command</kbd> + <kbd>b</kbd>                    | <kbd>Ctrl</kbd> + <kbd>b</kbd>                    |
| Print PDF                | <kbd>command</kbd> + <kbd>p</kbd>                    | <kbd>Ctrl</kbd> + <kbd>p</kbd>                    |
| Full Screen              | <kbd>command</kbd> + <kbd>f</kbd>                    | <kbd>Ctrl</kbd> + <kbd>f</kbd>                    |
| Export JSON              | <kbd>command</kbd> + <kbd>e</kbd>                    | <kbd>Ctrl</kbd> + <kbd>e</kbd>                    |
| Import JSON              | Drag and Drop file to Window                         | Drag and Drop file to Window                      |
| Export LaTeX             | <kbd>command</kbd> + <kbd>shift</kbd> + <kbd>e</kbd> | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>e</kbd> |

## User Interface

### Introduction about "Note", "Block" and "Canvas"

<p align='center'>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./assets/UI-block-intro-dark.png">
        <img alt="TexField Focusing" src="./assets/UI-block-intro-light.png" width='100%'>
	</picture>
</p>

The images above provide a simple introduction to the interface. The surrounding area is the Canvas, the center contains "Note", and within the notes ate editable regions for mathematical formulas called "Block". You can click on a block to focus on it.

---


### Toggling between "Normal Mode" and "Edit Mode"

<p align='center'>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./assets/UI-block-edit-dark.png">
        <img alt="TexField Editing" src="./assets/UI-block-edit-light.png" width='100%'>
	</picture>
</p>
The image above shows how to edit a "Block". After focusing on a "Block", you can press <kbd>command</kbd> + <kbd>/</kbd> (For Windows user, press <kbd>Ctrl</kbd> + <kbd>/</kbd>) to toggle between "Normal Mode" and "Edit Mode".

---


### Adding / Deleting "Blocks" & Draging "Canvas" and "Note"

<p align='center'>
    <picture align='left'>
        <source media="(prefers-color-scheme: dark)" srcset="./assets/UI-block-add-delete-dark-opt.gif">
        <img alt="TexField Add / Delete Block" src="./assets/UI-block-add-delete-light-opt.gif" width="49%">
    </picture>
    <picture align='right'>
        <source media="(prefers-color-scheme: dark)" srcset="./assets/UI-note-canvas-drag-dark-opt.gif">
        <img alt="TexField drag note & canvas" src="./assets/UI-note-canvas-drag-light-opt.gif" width="49%">
	</picture>
</p>

- The left video shows how to add and delete "Blocks". After focusing on a "Block", press <kbd>enter</kbd> (For Windows users, press <kbd>Enter</kbd>) to add a new "Block" below the focused "Block". Press <kbd>delete</kbd> (For Windows users, press <kbd>Backspace</kbd>) to delete the focused "Block".
- The right video shows how to move the entire "Canvas" and a single "Note". Dragging the "Canvas" directly will move the entire canvas. Press and hold <kbd>command</kbd> (For Windows users, hold <kbd>Ctrl</kbd>), then click on a "Note" to focus on it and drag it to move the "Note" individually.

> [!Note]
>
> The video I present is the old version. Therefore, adding/deleting "Block" need to hold command/ctrl. However, in current version, you don't need to do that.

---

### Linking two "Notes" by a "Path"

<p align='center'>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./assets/UI-add-path-dark-opt.gif">
        <img alt="TexField Editing" src="./assets/UI-add-path-light-opt.gif" width='100%'>
	</picture>
</p>

The video above shows how to link two "Notes". Press and hold <kbd>command</kbd> + <kbd>shift</kbd> and click-drag one of the "Note" to create a "Path", which is Bezier curve (For Windows user, hold <kbd>Ctrl</kbd> + <kbd>Shift</kbd>). Then, while holding the keys, release the click on the other "Note" to connect them with a "Path".

---

### Focus / Delete "Note" and "Path"

<p align='center'>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./assets/UI-note-path-delete-dark-opt.gif">
        <img alt="TexField Editing" src="./assets/UI-note-path-delete-light-opt.gif" width='100%'>
	</picture>
</p>

The video above shows how to delete "Block" and "Path". First, use <kbd>command</kbd> + click (Windows users, <kbd>Ctrl</kbd> + click) to select a "Note", or directly click a "Path" to select it. Then press <kbd>Delete</kbd> (Windows users, <kbd>Backspace</kbd>) to delete the selected "Note" or "Path".

> [!CAUTION]
> Currently, operations on "Notes" or "Paths" do not have an undo feature.
> Therefore, deleting or moving "Notes" and "Paths" cannot be undone.

## Features

- **Infinite Canvas**: Interact with a canvas that expands indefinitely to manage and organize your LaTeX notes and diagrams.
- **KaTeX Integration**: Utilize KaTeX for efficient and accurate LaTeX rendering, supporting a wide range of mathematical notation.

## Technology Stack

![JavaScript](https://img.shields.io/badge/JavaScript-gray?style=plastic&logo=javascript) ![CSS](https://img.shields.io/badge/CSS-gray?style=plastic&logo=css3&logoColor=rgb(100,160,250)) ![HTML](https://img.shields.io/badge/HTML-gray?style=plastic&logo=html5&logoColor=rgb(250,150,100)) ![LaTeX](https://img.shields.io/badge/LaTeX-gray?style=plastic&logo=LaTeX)

## License

**TexField** is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any questions or feedback, feel free to reach out to us at [jeffrey0613mao@gmail.com](jeffrey0613mao@gmail.com).
