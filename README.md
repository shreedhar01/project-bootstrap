# @shreedhar01/create-bootstrap

An `npm-create` package to quickly bootstrap new projects through a guided CLI flow.

## 🚀 Overview

`@shreedhar01/create-bootstrap` reduces the time and uncertainty involved in starting a new project by providing a simple interactive onboarding flow. It helps you initialize a clean, consistent, and repeatable project structure for different project types.

## 🛠 Usage

You can use this package directly with `npm create` (or equivalent commands in other package managers):

```bash
# Using npm
npm create @shreedhar01/bootstrap

# Using pnpm
pnpm create @shreedhar01/bootstrap

# Using yarn
yarn create @shreedhar01/bootstrap
```

## ✨ Supported Project Types

The CLI will guide you through selecting one of the following templates:

- **Frontend**: A modern frontend project setup.
- **Backend**: A clean backend project structure.
- **Fullstack**: A combined setup for building complete applications.

## 📖 Spec-Driven Development

This project follows a **Spec-Driven Development (SDD)** approach. You can find the architecture, mission, and feature specifications in the `spec/` directory:

- `spec/constitution/`: Core mission, tech stack, and roadmap.
- `spec/features/`: Detailed specifications and implementation details for each feature.

## 💻 Development

### Prerequisites

- Node.js >= 18
- [pnpm](https://pnpm.io/)

### Setup

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build
```

### Running Locally

To test the CLI locally without publishing:

```bash
# Using tsx to run the source directly
pnpm dev

# Or build and run the compiled output
pnpm start
```

### Testing

```bash
pnpm test
```

## 📜 License

[MIT](LICENSE) (or specify your license)
