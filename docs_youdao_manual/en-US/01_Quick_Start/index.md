---
id: lobsterai_user_manual
title: "Quick Start"
locale: en-US
route: /en/docs/lobsterai_user_manual
source_url: "https://lobsterai.youdao.com/#/en/docs/lobsterai_user_manual"
source_chunk: "https://shared.ydstatic.com/market/souti/fihserChatWeb/online/2.0.4/dist/assets/LobsterAI_User_Manual-F1CkTqAc.js"
---# LobsterAI User Manual

> A full-scenario personal assistant Agent available 24/7 to help you get things done.

## Quick Start

### What is LobsterAI?

LobsterAI is your full-scenario AI personal assistant, capable of helping you complete various work tasks 24/7. Whether it's writing code, processing documents, analyzing data, designing prototypes, searching for information, or creating games, LobsterAI can handle it all. Through its built-in **Skill System**, LobsterAI acts like an all-around assistant mastering multiple professional skills, always ready to serve you.

### Core Advantages

* **Free Model Switching**: Supports 10+ mainstream AI models; choose the most suitable assistant on demand.
* **Rich Skill Library**: Built-in 12+ professional skills covering development, design, office work, and more.
* **Task History Management**: Automatically saves all conversation records, allowing you to review and continue previous work at any time.
* **Local Deployment**: Supports local models like Ollama to protect data privacy.
* **Open Extensions**: Create your own skills to let LobsterAI learn any capability you need.

### First Launch

**Step 1: Configure AI Model**

After opening LobsterAI for the first time, you need to configure at least one AI model to start using it:

1. Click the "Settings" icon in the bottom left corner.
2. Go to the "Models" tab.
3. Select a model provider (e.g., Anthropic, OpenAI, DeepSeek, etc.).
4. Enter the corresponding API Key (you need to register an account on the provider's official website to obtain this).
5. Click "Test Connection" to confirm the configuration is correct.
6. Save the settings.

**Step 2: Start Using**

Once configured, return to the main interface, and you will see a clean chat box. Now you can:

* Describe your task in the input box, such as "Help me analyze this Excel data."
* Enable relevant functions in the "Skills" section of the left sidebar as needed.
* Click the send button to start collaborating with the AI.

**Quick Configuration Tips:**

* If you want to use it completely offline, you can choose **Ollama** (requires installing the Ollama service locally first).
* Domestic users can choose models like DeepSeek, Moonshot, Qwen, etc., for more stable network access.
* Different models have their own characteristics; choose according to task requirements and budget.

---

## Core Functions

### Smart Dialogue

LobsterAI's chat interface is your work center; all tasks start here.

**Features:**

* **Context Understanding**: LobsterAI remembers conversation history and understands the relationship between context.
* **File Upload**: Supports dragging and dropping files into the chat box for direct AI analysis and processing.
* **Code Highlighting**: Automatically identifies code blocks and provides syntax highlighting.
* **Multi-turn Iteration**: You can provide feedback on the AI's output to gradually refine the results.

**Usage Scenario:**

```
"Help me write a React component to display a user list."
"This component needs to support pagination, showing 20 items per page."
"Add a search function to search by username."

```

### Task Management

The left sidebar is your task history center, where all conversations are automatically saved.

**Function Description:**

* **New Task**: Click "New Task" to start a brand new conversation.
* **Search Tasks**: Quickly find historical tasks using keywords.
* **Task Actions**: Click the `...` menu next to a task to rename, pin, or delete it.

**Best Practices:**

* Create separate tasks for each independent project to ensure context isolation.
* Use meaningful task names, such as "Refactor User Module" instead of "Test."
* Regularly clean up historical tasks that are no longer needed.

### Skill System

Skills are the core feature of LobsterAI; each skill is a professional capability module.

**How to Enable Skills:**

1. Click the "Skills" button in the left sidebar.
2. Browse the list of available skills.
3. Click the toggle switch next to a skill to enable/disable it.

**How Skills Work:**

* Once a skill is enabled, the AI automatically gains professional knowledge and tools in that domain.
* Multiple skills can be enabled simultaneously; the AI will automatically choose which to use based on the task.
* Skills can be added or removed at any time during a conversation.

**Skill Status Indicators:**

* 🟢 Enabled: Available for the current conversation.
* ⚫ Disabled: Will not be used in the current task.

### Multi-Model Support

LobsterAI supports almost all mainstream AI models on the market. You can choose the most suitable model based on task characteristics.

**Supported Model Providers:**

* **OpenAI**: GPT-4o, GPT-4o-mini, etc.
* **Anthropic**: Claude Sonnet, Claude Opus, etc.
* **Google**: Gemini Pro, Gemini Flash, etc.
* **DeepSeek**: DeepSeek Reasoner, DeepSeek Chat.
* **Domestic Providers**: Moonshot, Zhipu, MiniMax, Qwen.
* **Aggregators**: OpenRouter (access to multiple models).
* **Local Deployment**: Ollama (supports open-source models like Llama, Mistral).

**Configuration Steps:**

1. Go to "Settings" → "Models".
2. Select the model provider you want to use.
3. Enter the API Key and related configuration.
4. Click "Save" to complete.

**Configuration Examples:**

**Anthropic Configuration**

* **API Key**: Get it from [Anthropic Console](https://console.anthropic.com).
* **Base URL**: No change needed by default (uses official endpoint).
* **Available Models**: Select Claude Sonnet 4.5, Claude Opus 4, etc.

**DeepSeek Configuration**

* **API Key**: Get it from [DeepSeek Platform](https://platform.deepseek.com).
* **Base URL**: [https://api.deepseek.com](https://api.deepseek.com) (filled by default).
* **API Format**: Select the API protocol compatible format.
* **Anthropic Compatible**: Suitable for scenarios requiring structured output.
* **OpenAI Compatible**: Suitable for users migrating from OpenAI.



**Ollama Local Deployment**

* **Base URL**: http://localhost:11434 (default port).
* **No API Key required**, directly uses local models.

**Switching Models:**

* Click the model selector at the top of the chat interface.
* Select a configured model from the dropdown menu.
* After switching, new conversations will use the selected model.

---

## Typical Workflows

Here are some complete workflows for real-world scenarios to help you get started quickly.

### Scenario 1: Data Analysis Report Generation

**Task**: The boss wants an analysis report of last month's sales data.

**Steps**:

1. Enable `xlsx` and `docx` skills.
2. Upload the sales data Excel file.
3. Input in the chat box:
```
"Analyze this sales data, identify the Top 10 products and sales trends,
and generate a Word report containing charts."

```


4. The AI will automatically:
* Read and analyze Excel data.
* Calculate key metrics (YoY, MoM, etc.).
* Generate trend charts and bar charts.
* Output a formatted Word report.


5. If adjustments are needed, continue the dialogue:
```
"Change the charts to pie charts and add product category statistics."

```



**Estimated Time**: 5-10 minutes (Traditional methods might take 1-2 hours).

---

### Scenario 2: Rapid Frontend Component Development

**Task**: Develop a user management page for a project.

**Steps**:

1. Enable `frontend-design` and `web-search` skills.
2. Describe the requirements:
```
"Create a user management page containing:
- User list display (table format)
- Search and filter functions
- Popup for adding/editing users
Use React + TypeScript, UI style reference Ant Design."

```


3. The AI will generate the complete component code.
4. After reviewing the code, if modifications are needed:
```
"Add pagination to the table, showing 20 items per page."
"Add email validation to the popup form."

```


5. Copy the generated code into your project for testing.

**Estimated Time**: 10-15 minutes (Traditional development might take half a day).

---

### Scenario 3: Automated Test Script Writing

**Task**: Write E2E tests for the login process.

**Steps**:

1. Enable the `playwright` skill.
2. Provide the login page URL and test requirements:
```
"Write automated tests for https://example.com/login:
1. Test normal login flow
2. Test error messages (wrong username or password)
3. Test 'Remember Me' functionality"

```


3. The AI will generate a complete Playwright test script.
4. Run the script to verify functionality.
5. Adjust based on test results:
```
"Add a test case for login timeout."

```



**Estimated Time**: 5-8 minutes (Hand-writing might take over 30 minutes).

---

### Scenario 4: Multi-format Document Conversion

**Task**: Extract PDF contract content and organize it into an Excel table.

**Steps**:

1. Enable `pdf` and `xlsx` skills.
2. Upload the PDF contract file.
3. Input requirements:
```
"Extract all terms and amount information from this contract,
organize into an Excel table containing: Clause Number, Content, Amount, Remarks."

```


4. The AI will:
* Read PDF content.
* Identify key information.
* Structure output to Excel.


5. Export the Excel file for team use.

**Estimated Time**: 3-5 minutes (Manual copy-paste might take 20-30 minutes).

---

## Skill Details

### Document Processing

#### docx - Word Document Processing

Handles the creation, editing, and analysis of Word documents.

**Use Cases:**

* Generating technical documentation and requirements documents.
* Batch extraction of key information from documents.
* Document format conversion and layout optimization.

**Examples:**

```
"Generate API documentation based on this code, save as Word format."
"Analyze this requirements document and extract a list of all functional points."

```

#### xlsx - Excel Spreadsheet Processing

Handles Excel data analysis, table generation, and formula calculations.

**Use Cases:**

* Data cleaning and formatting.
* Generating data reports.
* Complex formula calculations and pivot tables.

**Examples:**

```
"Help me analyze this sales data and generate a monthly trend chart."
"Create an expense statistics table containing auto-sum formulas."

```

#### pptx - PowerPoint Presentation

Creates and edits professional presentations.

**Use Cases:**

* Technical sharing PPT production.
* Product presentation generation.
* Meeting report material preparation.

**Examples:**

```
"Generate a 10-page report PPT based on this project summary."
"Create a product introduction PPT, style should be simple and professional."

```

#### pdf - PDF Document Processing

Handles reading, extracting, and analyzing PDF documents.

**Use Cases:**

* Extracting text and tables from PDFs.
* Analyzing contracts, reports, and other PDF files.
* Structured processing of PDF content.

**Examples:**

```
"Read this PDF contract and extract all key clauses."
"Analyze this research report and summarize the core viewpoints."

```

---

### Development Tools

#### develop-web-game - Web Game Development

Develop simple web games using HTML5 Canvas and JavaScript.

**Features:**

* Pure frontend implementation, no backend required.
* Supports common game types (Casual, Puzzle, Action, etc.).
* Provides complete game loops and collision detection.

**Use Cases:**

* Rapid prototyping of game ideas.
* Teaching demos and interactive content.
* H5 mini-game development.

**Examples:**

```
"Help me make a shooting plane game, controlled by keyboard."
"Create a Snake game and add a scoring function."

```

#### remotion-best-practices - Remotion Video Development

Create programmatic video content using the Remotion framework.

**Suitable For:**

* Data visualization animations.
* Automated video generation.
* Product demo videos.

**Examples:**

```
"Create a data growth animation video using Remotion."
"Generate a short video demonstrating product features."

```

#### playwright - Browser Automation

Use Playwright for Web automation testing and data scraping.

**Use Cases:**

* Writing End-to-End test scripts.
* Batch scraping of web content.
* Automated form filling and operations.

**Examples:**

```
"Write an automated test to check the login flow."
"Scrape all product information from this website."

```

---

### Design Tools

#### canvas-design - Canvas Design

Create graphics and visual content using HTML Canvas.

**Use Cases:**

* Data visualization charts.
* Custom graphic drawing.
* Interactive canvas applications.

**Examples:**

```
"Draw a company organization chart using Canvas."
"Create an interactive flowchart editor."

```

#### frontend-design - Frontend Design

Create modern frontend interfaces and components.

**Features:**

* Follows latest design trends.
* Responsive layout.
* Accessibility (a11y) support.

**Use Cases:**

* UI component development.
* Page layout design.
* Rapid prototyping.

**Examples:**

```
"Design a modern login page supporting dark mode."
"Create a card-style product list component."

```

---

### Utility Tools

#### web-search - Web Search

Allows the AI to search the internet for the latest information.

**Use Cases:**

* Finding technical documentation and tutorials.
* Getting real-time data and news.
* Researching competitors and industry trends.

**Examples:**

```
"Search for the new features in React 18."
"Find the latest frontend performance optimization best practices."

```

#### create-plan - Create Plan

Helps you formulate project plans and task breakdowns.

**Use Cases:**

* Task planning during project initiation.
* Breakdown of steps for implementing complex functions.
* Creating learning paths.

**Examples:**

```
"Help me plan the development schedule for an e-commerce website."
"Create a three-month plan for learning TypeScript."

```

#### skill-creator - Skill Creator

Create custom skills to extend LobsterAI's capabilities.

**Use Cases:**

* Customizing skills for specific business scenarios.
* Integrating your own tools and workflows.
* Building a team-specific skill library.

**Examples:**

```
"Create a skill to generate test cases in our company's format."
"Develop a skill for an automated deployment process."

```

---

## Advanced Use

### Custom Skills

LobsterAI allows you to create your own skills, enabling the AI to master your specific workflows.

**Creation Steps:**

1. Enable the `skill-creator` skill.
2. Describe the capability you want:
```
"Create a skill: Automatically generate code comments that meet our team standards."

```


3. The Skill Creator will guide you to refine the details.
4. Once created, the new skill will appear in the skills list.

**Skill Composition:**

* **Skill Description**: Tells the AI the purpose of this skill.
* **Expertise**: Provides domain knowledge, standards, templates, etc.
* **Tool Integration**: Can call external tools or APIs.
* **Example Dialogue**: Demonstrates typical usage of the skill.

**Best Practices:**

* Skill descriptions should be clear and specific; avoid vague wording.
* Provide sufficient examples to help the AI understand the expected output.
* One skill should focus on doing one thing well; avoid over-complexity.
* Regularly test and optimize skill performance.

### Shortcuts

Shortcut configurations to improve operational efficiency.

**System Default Shortcuts:**

* `Cmd/Ctrl + N`: New Task.
* `Cmd/Ctrl + K`: Focus Search Box.
* `Cmd/Ctrl + ,`: Open Settings.
* `Cmd/Ctrl + Enter`: Send Message.
* `Esc`: Cancel current input.

**Custom Shortcuts:**

1. Go to "Settings" → "Shortcuts".
2. Click the shortcut you want to modify.
3. Press the new key combination.
4. Save settings.

**Tip**: Avoid conflicts with system shortcuts; consider using combinations like `Cmd/Ctrl + Shift + X`.

### Sandbox Mode

Sandbox mode lets the AI execute code in an isolated virtual environment, protecting your system security.

**How it Works:**

* AI-generated code runs in an independent VM environment.
* Access to the local file system is restricted.
* Network requests are monitored and restricted.
* Automatically detects potential dangerous operations.

**Applicable Scenarios:**

* Testing code from uncertain sources or logic.
* Running third-party scripts.
* Learning and experimenting with new technologies.
* Processing untrusted data.

**Execution Mode Selection:**

Go to "Settings" → "Sandbox" and select the appropriate execution mode:

1. **Automatic (Prefer Sandbox)**
* Prioritizes built-in VM sandbox; falls back to local execution if unavailable.
* Balances security and convenience.
* Suitable for most daily use scenarios.


2. **Local Run**
* Always executes code in the host environment.
* Best performance, unrestricted access to local resources.
* Suitable for trusted tasks and operations requiring full system permissions.


3. **Sandbox Only (Built-in VM)**
* Requires built-in VM sandbox availability, otherwise refuses execution.
* Highest security level.
* Suitable for processing untrusted code or data.



**First Use Prompt:**

If "VM Runtime Not Detected" appears when selecting Sandbox mode:

1. Click the "Install Sandbox" button.
2. The system will automatically download and configure the virtual environment (approx. 200MB).
3. Once installed, the sandbox function is ready to use.
4. Installation may take 5-10 minutes depending on network speed.

**Performance Note:**

* Sandbox mode slightly increases code startup time (approx. 1-2 seconds).
* For most tasks, the performance impact is negligible.
* If performing computationally intensive tasks, consider temporarily switching to Local Run mode.

---

## Q&A Common Questions

### Basic Usage

**Q1: What is the difference between LobsterAI and other AI assistants?**

The biggest feature of LobsterAI is its **Skill System** and **Full-Scenario Coverage**. Traditional AI assistants are just chat tools, whereas LobsterAI modularizes different capabilities through skills, making the AI more professional in specific domains. Whether it's programming, document processing, data analysis, or design work, LobsterAI serves you like an all-around assistant on standby 24/7.

**Q2: Can multiple skills be enabled at the same time?**

Yes. The AI will automatically choose which skills to use based on your task. For example, if you enable both `docx` and `web-search`, the AI can search for materials and then generate a Word document.

**Q3: What if a skill doesn't work?**

1. Confirm the skill is enabled on the "Skills" page (switch is blue).
2. Check error messages to see if configuration is missing.
3. Try re-enabling the skill or restarting the application.

---

### Model Configuration

**Q4: How to configure AI models?**

1. Go to "Settings" → "Models".
2. Select the model provider you want to use (e.g., Anthropic, DeepSeek).
3. Enter the API Key and related configuration.
4. Click "Save" to complete.

**Q5: Is the API Key safe?**

The API Key is stored only on your local device and is not uploaded to any server. You can create a dedicated Key for LobsterAI and set usage limits.

**Q6: Why does model configuration fail?**

Common reasons:

* **Incorrect API Key**: Check if copied completely, watch for leading/trailing spaces.
* **Incorrect Base URL**: Confirm the correct endpoint address is used.
* **Wrong API Format Selection** (DeepSeek users): Check if the correct compatible format (Anthropic or OpenAI) is selected.
* **Network Issues**: Accessing OpenAI/Anthropic domestically may require configuring a proxy.
* **Insufficient Quota**: Check account balance or if API quota is exhausted.
* **Model Permissions**: Confirm the API Key has permission to access that model.

**Q7: How to view API usage?**

LobsterAI itself does not track usage; please visit the corresponding provider's console:

* OpenAI: [Usage Dashboard](https://platform.openai.com/usage)
* Anthropic: [Console Dashboard](https://console.anthropic.com)
* DeepSeek: [Platform Console](https://platform.deepseek.com)

---

### Usage Tips

**Q8: How to get output that better matches expectations?**

* **Be Specific**: Don't say "optimize code," say "reduce the loop nesting level of this function."
* **Provide Examples**: Give samples of the expected output.
* **Step-by-Step**: Break complex tasks into multiple small steps.
* **Feedback Iteration**: Give specific modification suggestions on the AI's output.

**Q9: How to let the AI understand my project structure?**

At the start of a new task, upload the project's core files or directory structure and describe briefly:

```
"This is a React + TypeScript project built with Vite.
Main code is in the src directory, components in src/components."

```

**Q10: How to ensure the AI follows project standards?**

Provide project specification documents or key rules at the start of the task:

```
"Project Standards:
1. Use 4-space indentation.
2. Function comments use JSDoc format.
3. Component files end with .tsx, style files use .module.css."

```

Or create a custom skill to solidify these standards into skill knowledge.

---

### Troubleshooting

**Q11: What if the conversation is suddenly interrupted?**

Possible causes:

* **Network Timeout**: Check network connection and retry.
* **Token Limit Exceeded**: Conversation too long exceeding model limits; start a new task.
* **API Quota Exhausted**: Check account balance.
* **Model Service Failure**: Wait for service recovery or switch to another model.

**Q12: The code output by AI cannot run**

1. Check if dependencies or environment configurations are missing.
2. Feed the error message back to the AI:
```
"Run error: TypeError: xxx is not defined"

```


3. If it's a third-party library issue, enable the `web-search` skill to find the latest documentation.

**Q13: App lag or high memory usage**

* Clear historical task records (delete unwanted conversations).
* Close unused skills.
* Avoid accumulating too many conversation turns in a single task.
* Restart the application to release memory.

**Q14: Does LobsterAI support offline use?**

Some features can be used offline:

* **Local Models (Ollama)**: Runs completely offline, no network connection needed.
* **Enabled Skills**: The logic of the skills themselves can be executed offline.
* **Cloud Models (OpenAI/Anthropic/DeepSeek, etc.)**: Require network connection.

If you have high data privacy requirements, you can use Ollama to configure local models.

**Q15: How to export conversation records?**

Currently, conversation records are stored in a local database. Export method:

1. Find the conversation you want to export in the task list.
2. Click the `...` menu next to the task.
3. Select "Export".
4. Choose export format (Markdown / JSON / TXT).
5. Save to a local folder.

**Q16: Can skills be shared across different tasks?**

Yes. Once a skill is enabled, it applies to all tasks. If you only want to use a skill in a specific task, you can:

* Explicitly state at the start of the task: "Use xlsx skill to process this table."
* Or temporarily enable the skill when needed, and disable it after completion.

**Q17: How to handle sensitive data?**

Consider the following methods:

* **Use Local Models**: Deploy local models via Ollama to process sensitive info.
* **Data Masking**: Mask sensitive fields before uploading.
* **Avoid Plain Text Transmission**: Do not paste passwords, API Keys, or credentials directly into the chat.
* **Regular Cleanup**: Promptly delete relevant task records after processing sensitive data.

**Q18: Can custom skills be shared within a team?**

Yes. Custom skills are stored as files locally and can be shared via:

1. Find the skill file location (usually in `~/Library/Application Support/LobsterAI/SKILLs/`).
2. Pack the skill folder and send it to team members.
3. Team members place the folder in the same location.
4. Restart LobsterAI, and the new skill will automatically appear.

Teams can establish a skill library repository to uniformly manage and distribute custom skills.

---

## Contact & Feedback

If you encounter problems or have suggestions for improvement, please contact us via:

* **GitHub Issues**: Submit Bug reports and feature requests.
* **Community Forum**: Exchange usage experiences with other users.
* **Official Documentation**: Get the latest updates and tutorials.
