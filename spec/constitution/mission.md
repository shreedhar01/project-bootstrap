# Mission

## Product Intent

Build an npm-create package that helps users bootstrap a new project through a guided CLI flow.

The intended usage pattern is:

```bash
pnpm create @shreedhar/package
```

The package should ask the user what they want to create and initialize a suitable project structure based on the selection:

- Frontend
- Backend
- Fullstack

## Core Mission

Reduce the time and uncertainty involved in starting a new project by providing:

- A simple interactive onboarding flow
- Clear project-type choices
- Sensible default project structures
- A clean and repeatable initialization process

## Target Users

- Developers starting a new app quickly
- Solo builders who want fast setup with minimal decision fatigue
- Teams that want a consistent starting point across project types

## Product Principles

- Fast first-run experience
- Minimal but useful prompts
- Strong defaults over excessive configuration
- Clear folder structures that are easy to extend
- Predictable generated output
- Easy future expansion for new templates and features

## Initial Scope

The first version should focus on:

- CLI-based project type selection
- Project scaffolding for frontend, backend, and fullstack
- Consistent generated structure

The first version should not focus on:

- Large numbers of optional integrations
- Complex plugin systems
- Framework-specific branching unless clearly justified

## Success Criteria

The project is successful if a user can run one command, choose a project type, and receive a usable starter structure without needing manual setup steps to understand the generated layout.
