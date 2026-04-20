# Roadmap

## Phase 1: Foundation

Goal:
Define the product direction and establish the specification baseline.

Deliverables:

- Constitution documents
- Clear mission and scope
- Initial technical direction

Status:

- In progress with the creation of the constitution

## Phase 2: Feature Specification

Goal:
Define the actual scaffolding behavior before implementation begins.

Deliverables:

- Feature specs for frontend scaffolding
- Feature specs for backend scaffolding
- Feature specs for fullstack scaffolding
- CLI interaction flow definition
- Output structure expectations for each project type

## Phase 3: Project Setup

Goal:
Create the package repository foundation.

Deliverables:

- `package.json`
- TypeScript configuration
- Linting and formatting setup
- Test setup
- CLI entrypoint structure

## Phase 4: Core CLI Flow

Goal:
Implement the interactive create flow.

Deliverables:

- CLI command bootstrapping
- Prompt for project type selection
- Validation for target directory and naming rules
- Success and error messaging

## Phase 5: Template Generation

Goal:
Generate starter structures based on the selected project type.

Deliverables:

- Frontend template generation
- Backend template generation
- Fullstack template generation
- Shared file generation utilities

## Phase 6: Validation

Goal:
Verify that generated projects are correct and usable.

Deliverables:

- Unit tests
- Integration tests
- Manual smoke tests for local package execution

## Phase 7: Publish Readiness

Goal:
Prepare the package for npm release.

Deliverables:

- Package metadata cleanup
- README
- Versioning strategy
- Dry-run publish verification

## Phase 8: First Release

Goal:
Publish the first usable version to npm.

Deliverables:

- Initial npm release
- Basic release notes

## Future Expansion

Potential next areas after first release:

- Framework-specific starter options
- Optional tooling presets
- Database and authentication starters
- Monorepo-aware fullstack templates
- Post-generation dependency installation options
