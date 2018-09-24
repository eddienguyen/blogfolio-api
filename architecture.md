## Architecture Design
- node server /w Keystone CMS
- react UI & routing
- MVC
- RESTful
### 1. Collections/Models:
- Team member:
    - Name
    - Profile Image
    - Bio: textarea
    - Bio summary: text 
    - Job title
    - Email
    - Phone number
    - Social links: array
    - Active

- Projects:
    - Name
    - Description
    - Number
    - Completion Date
    - Author
    - Project type
    - Image
    - Image Description
    - Project Details: textarea
    - Active

- Articles/ Blog Posts: 
    - title
    - CreatedAt
    - publishedAt
    - Author
    - Main Image/thumbnail
    - content(summary|extended)
    - state(draft | published | archived)

### 2. Controller
- CRUD (Projects, Articles)
    - Create
    - Read => get item with active == true
    - Update
    - Delete => update(active: false)

### 3. Route / RESTful
- Keystone return data (JSON)
- API example: 
    * Admin CP:
        - PUT: '/api/articles/:id' = update one article
        - DELETE: '/api/articles/:id' = delete one article
        - POST: '/api/articles/' = create new

    * User-view: 
        - URI: '/api/articles/'
        - GET: '/api/articles/' = read all articles
        - GET: 'api/articles/:id' = read article's detail - published and archived
        
        - URI: '/api/projects/'
        - GET: 'api/projects/' = list all projects
        - GET: 'api/projects/:id' = get one project's detail

        - URI: 'api/team-member'
        - GET: 'api/team-member/ = list all team members
        - GET: 'api/team-member/:id' = get one member's detail

        - URI: 'api/user/:id' = get user's detail

        - Get projects by member
        - Get posts by user(author)
        - Get projects by projectType

        - archive team-member, posts, projects after authentication/authorization middleware