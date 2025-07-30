# Solace Healthcare Advocates Directory

A modern, performant healthcare advocate search application built with Next.js, featuring server-side rendering, responsive design, and scalability considerations for hundreds of thousands of records.

## What We Built

This application started as a basic advocate table and has been transformed into a production-ready healthcare directory with:

- **Server-Side Rendering (SSR)** - Migrated from client-side data fetching for better SEO and performance
- **Modern UI/UX** - Complete redesign using Tailwind CSS with responsive, accessible components
- **Advanced Search** - Real-time search across names, cities, degrees, and specialties
- **Smart Pagination** - Efficient pagination with page numbers and navigation
- **Error Handling** - Graceful error states with user-friendly messages
- **Performance Optimizations** - Caching headers and database query optimizations

## Features

### 🔍 Search Functionality

- Search across advocate names, cities, degrees, and specialties
- URL-based search parameters for shareable results
- Graceful fallback for database connection issues

### 📱 Responsive Design

- Mobile-first approach with breakpoint-specific layouts
- Touch-optimized interface elements
- Horizontal scrolling for tables on small screens

### ⚡ Performance

- Server-side rendering for instant page loads
- Efficient pagination to handle large datasets
- Cache headers for API responses
- Optimized for hundreds of thousands of records

### 🎨 User Experience

- Modern, clean interface with professional healthcare aesthetic
- Loading states with skeleton screens
- Empty states with helpful actions
- Formatted phone numbers for easy reading
- Specialty badges with tooltips

### ♿ Accessibility

- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast ratios for readability

## Architecture Decisions

### Why Server-Side Rendering?

We chose SSR over client-side rendering to:

- Improve SEO for healthcare professionals' visibility
- Reduce initial load time for users
- Maintain functionality without JavaScript
- Simplify state management

### Database Flexibility

The application works with or without a database connection:

- **With Database**: Full PostgreSQL integration using Drizzle ORM
- **Without Database**: Falls back to mock data for development/testing
- Seamless switching between modes

### Scalability Considerations

Built with large datasets in mind:

- Pagination limits data transfer
- Database indexes planned for search columns
- Cache-friendly API design
- Cursor pagination ready (see DISCUSSION.md)

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Database set up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```

## Testing the Application

### Search Functionality

1. Visit `http://localhost:3000`
2. Try searching for:
   - Names: "John", "Sarah"
   - Cities: "New York", "Chicago"
   - Specialties: "Trauma", "Pediatrics"
   - Degrees: "MD", "PhD"

### Pagination

- Navigate through pages using the pagination controls
- Try deep pagination (e.g., `?page=5`)
- Combine with search (e.g., `?search=therapy&page=2`)

### Responsive Design

- Resize your browser to see mobile/tablet/desktop layouts
- Test on actual mobile devices for touch interactions

### Error Handling

- Disconnect database to see fallback behavior
- Try invalid page numbers to test error boundaries

## Performance Notes

### Current Performance

- Mock data: ~15 advocates (instant response)
- With database: Supports thousands of records efficiently
- API caching: 60-second cache with stale-while-revalidate

### Scaling to 100,000+ Records

See `DISCUSSION.md` for detailed scaling strategies including:

- Database indexing strategies
- Elasticsearch integration plans
- Cursor-based pagination approach
- Redis caching implementation

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API endpoints
│   │   ├── advocates/     # Main data endpoint
│   │   └── seed/         # Database seeding
│   ├── error.tsx         # Error boundary
│   ├── loading.tsx       # Loading states
│   └── page.tsx          # Main page
├── components/            # React components
│   ├── advocates-table.tsx
│   ├── hero-section.tsx
│   └── pagination.tsx
├── db/                    # Database layer
│   ├── schema.ts         # Drizzle schema
│   └── seed/             # Seed data
├── lib/                   # Utilities
│   ├── advocates.ts      # Data fetching
│   ├── constants.ts      # App constants
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript types

```

## Testing

This project uses **Vitest** for fast, modern testing with TypeScript support.

### Running Tests

```bash
# Run tests in watch mode (development)
npm test

# Run tests once (CI/production)
npm run test:run

# Run tests with UI dashboard
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

The test suite covers:

- **Utility functions**: Phone formatting and text truncation
- **Data fetching**: Advocate search and pagination logic
- **Components**: Search form, table display, and pagination controls
- **User interactions**: Form submissions and navigation

### Test Architecture

- **Vitest**: 3-4x faster than Jest with better TypeScript support
- **React Testing Library**: User-centric testing approach
- **Mock Database**: Tests run against consistent seed data
- **Component Testing**: Focus on user behavior, not implementation

## Environment Variables

See `.env.example` for configuration options. The main variable is:

- `DATABASE_URL`: PostgreSQL connection string (optional)

## Additional Documentation

- `DISCUSSION.md` - Future improvements and scaling considerations
- `PR_STRATEGY.md` - How to organize changes into pull requests
- API Documentation - See comments in `/api/advocates/route.ts`
