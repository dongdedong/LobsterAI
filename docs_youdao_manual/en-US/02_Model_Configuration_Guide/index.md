---
id: lobsterai_model_config_guide
title: "Model Configuration Guide"
locale: en-US
route: /en/docs/lobsterai_model_config_guide
source_url: "https://lobsterai.youdao.com/#/en/docs/lobsterai_model_config_guide"
source_chunk: "https://shared.ydstatic.com/market/souti/fihserChatWeb/online/2.0.4/dist/assets/TopVanAI_Model_Configuration_Guide-DaZ-4T1P.js"
---# TopVanAI Model Configuration Guide

> This guide details how to configure mainstream domestic (Chinese) AI models, helping you integrate them into TopVanAI.

---

## 📖 What is an API Key?

### Basic Concept

Imagine this:

* **The AI Model** is a super-smart assistant running on the provider's cloud server.
* **The API Key** is an exclusive access pass given to you by the provider.
* **TopVanAI** is the tool that helps you connect to and use these AI models.

### Usage Workflow

1. Register an account on the AI provider's website.
2. Get the API Key provided by that service.
3. Configure the API Key inside TopVanAI.
4. You can now use that model within TopVanAI.

### Cost Explanation

* **TopVanAI itself is free**; we do not charge any fees.
* AI model services are provided by their respective companies, and fees are paid directly to them.
* It's like the relationship between WeChat (Free) and Didi Taxi (Paid): WeChat is the tool, but the taxi service requires separate payment.

---

## 🎯 Supported Domestic Models

TopVanAI supports the following domestic AI model providers:

| Provider | Key Features | Official Website |
| --- | --- | --- |
| **DeepSeek** | High cost-performance ratio | [https://platform.deepseek.com](https://platform.deepseek.com) |
| **Zhipu AI** | Tsinghua University tech background, GLM series | [https://open.bigmodel.cn](https://open.bigmodel.cn) |
| **Qwen (Tongyi)** | Alibaba Cloud AI model service | [https://dashscope.aliyun.com](https://dashscope.aliyun.com) |
| **Moonshot** | Kimi model supporting ultra-long context | [https://platform.moonshot.cn](https://platform.moonshot.cn) |
| **MiniMax** | Provides multi-modal AI capabilities | [https://www.minimaxi.com](https://www.minimaxi.com) |

---

## 📋 Configuration Overview

The configuration process is basically the same for all models:

```
1️⃣ Register Account → 2️⃣ Real-name Verification → 3️⃣ Get API Key → 4️⃣ Top up Account → 5️⃣ Configure in TopVanAI

```

### ⚡ Quick Jump (For Registered Users)

If you have already registered an account with a provider, you can jump directly based on your situation:

#### Scenario 1: Have Account, API Key, and Balance

**Jump directly to**: Select your provider and find the "Configure in TopVanAI" section.

* [DeepSeek - Step 5: Configure in TopVanAI](https://www.google.com/search?q=%23step-5-configure-in-lobsterai)
* [Zhipu AI - Step 6: Configure in TopVanAI](https://www.google.com/search?q=%23step-6-configure-in-lobsterai)
* [Qwen - Step 7: Configure in TopVanAI](https://www.google.com/search?q=%23step-7-configure-in-lobsterai)
* [Moonshot - Step 5: Configure in TopVanAI](https://www.google.com/search?q=%23step-5-configure-in-lobsterai-2)
* [MiniMax - Step 5: Configure in TopVanAI](https://www.google.com/search?q=%23step-5-configure-in-lobsterai-3)

#### Scenario 2: Have Account, but NO API Key

**Action**: Log in to the platform → Find "API Management" or "Key Management" → Create a new Key → Then jump to "Configure in TopVanAI" above.

#### Scenario 3: Have Account and API Key, but Insufficient Balance

**Action**: Log in to the platform → Enter "Top up" or "Billing Center" → Recharge → Then jump to "Configure in TopVanAI" above.

#### Scenario 4: Completely New User

**Action**: Please follow the full tutorials below starting from Step 1.

---

Below are detailed configuration steps for each provider.

---

## 🔧 DeepSeek Configuration Tutorial

### Step 1: Register DeepSeek Account

1. **Open Website**: Enter `https://platform.deepseek.com` in your browser.
2. **Click Register**: Find the "Login/Register" button and click to enter.
3. **Fill in Registration Info**:
* You can choose to register via Phone, Email, or WeChat scan.
* Enter Phone/Email or scan code.
* Click "Get Verification Code".
* Enter the received code.
* Set a login password.


4. **Complete Registration**: Click the "Register" button.

### Step 2: Real-name Verification

According to national regulations, using AI services requires real-name verification.

1. **Enter Verification Page**: After logging in, the system may prompt for verification, or click "Personal Information" in the bottom left to enter.
2. **Fill in Verification Info**:
* Enter real name.
* Enter ID card number.
* Upload photos of the front and back of your ID card.


3. **Wait for Audit**: Wait for the system audit after submission; usually completed within minutes.

### Step 3: Get API Key

The API Key is the secret key to access the model service. Please keep it safe.

1. **Enter API Management**: Click "API Keys" in the left menu.
2. **Create New Key**:
* Click the "Create API Key" button.
* Name the key (e.g., "TopVanAI").
* Click "Create".


3. **Copy and Save Key**:
* After creation, a long string of characters will appear, looking like `sk-xxxxxxxxxxxxx`.
* Click the "Copy" button.
* ⚠️ **Important**: The key is shown only once. Save it immediately.



💾 **Reference Saving Methods**:

* Save to computer Notepad/Memo.
* Send to WeChat "File Transfer Assistant".
* Save to phone notes.

### Step 4: Account Top Up

1. **Enter Top Up Page**: Click "Account Top Up" in the left menu.
2. **Select Amount**:
* Check the minimum top-up requirement.
* Select an appropriate amount.
* Supports Alipay and WeChat Pay.


3. **Complete Payment**:
* Choose payment method.
* Scan code to pay.
* Balance will update after success.



### Step 5: Configure in TopVanAI

1. **Open TopVanAI Settings**:
* Launch TopVanAI.
* Click the "Settings" icon (gear ⚙️) in the top right.
* Click the "Models" option on the left.


2. **Find DeepSeek**: Locate "DeepSeek" in the model list.
3. **Fill Configuration Info**:
* **Enable Switch**: Click the toggle to enable.
* **API Key**: Paste the key you copied earlier.
* **API Base URL**: Use the default URL.
* **Model Selection**: Choose the available model as needed.


4. **Test Connection**:
* Click the "Test Connection" button.
* Check connection status.
* If failed, please check:
* Is the API Key complete (no extra spaces)?
* Is the Base URL correct?
* Is the account balance sufficient?




5. **Save Configuration**: Click "Save" after a successful test.

### Start Using

After configuration:

1. Return to the chat interface.
2. Select "DeepSeek" in the model selector.
3. Start conversing.

---

## 🎓 Zhipu AI (GLM) Configuration Tutorial

### Step 1: Register Zhipu AI Account

1. **Open Website**: Enter `https://open.bigmodel.cn` in browser.
2. **Click Register**: Click the "Register" button in the top right.
3. **Fill Registration Info**:
* Choose Phone, Email, or WeChat scan.
* Get and enter verification code.
* Set login password.


4. **Complete Registration**: Click "Register".

### Step 2: Get API Key

1. **Enter Console**: Enter the console after successful registration.
2. **Enter API Management**: Click "API Keys" in the top right.
3. **Create Key**:
* Click "Create new API Key".
* Enter key name.
* Click "Confirm".


4. **Copy Key**:
* Copy the displayed API Key and save it.
* ⚠️ The key is shown only once; please be sure to save it.



### Step 3: Real-name Verification

According to regulations, AI services require real-name verification.

1. **Enter Verification Page**: The system will prompt you after login, or you can complete it in the console.
2. **Fill Info**:
* Real name.
* ID card number.
* Upload ID card photos.


3. **Wait for Audit**: Usually completed within minutes.

### Step 4: Check Account Balance

1. **Check Balance**: Click Avatar in top right → "Account Balance".
2. **View Available Quota**: Check available balance and gifted quota.

### Step 5: Account Top Up

1. **Enter Top Up Page**: Click "Finance" → "Account Balance" → "Go to Top Up".
2. **Select Method**:
* Online: Alipay/WeChat.
* Corporate Transfer: For enterprise users.


3. **Complete Payment**.

### Step 6: Configure in TopVanAI

1. **Open Settings**: TopVanAI → Settings ⚙️ → Models.
2. **Find Zhipu AI**: Locate "Zhipu GLM" in the list.
3. **Fill Config**:
* **Enable**: Turn on switch.
* **API Key**: Paste Zhipu AI key.
* **API Base URL**: Use default.
* **Model**: Select desired model.


4. **Test and Save**: Click "Test Connection" → then "Save".

---

## ☁️ Alibaba Qwen (Tongyi Qianwen) Configuration Tutorial

### Step 1: Register Alibaba Cloud Account

If you have a Taobao/Alipay account, you can log in directly.

1. **Open Aliyun**: Enter `https://www.aliyun.com`.
2. **Click Register**: Click "Free Register" or "Login" in the top right.
* Existing users: "Login".
* New users: "Free Register".


3. **Complete Registration**:
* Enter phone number.
* Verify code.
* Set password.
* Click "Register".



⚠️ **Important**: You must complete Real-name Verification on Alibaba Cloud to use Bailian services.

### Step 2: Complete Real-name Verification

1. **Enter Verification Page**:
* Found under the user avatar menu "Real-name Verification".


2. **Fill Info**:
* Real name, ID number, ID photos.


3. **Wait for Audit**: Usually fast.
✅ Status will show "Completed".

### Step 3: Activate Alibaba Cloud Bailian Service

**Important**: Qwen uses the Alibaba Cloud Bailian (Model Studio) platform.

1. **Open Bailian Console**:
* Browser: `https://bailian.console.aliyun.com`
* Or via product page: `https://www.aliyun.com/product/bailian` click "Console".


2. **First Time Activation**:
* Find "Free Trial" or "Activate Now".
* Agree to agreements and activate.


3. **Enter Console Home**:
* You can now create keys.



### Step 4: Create API Key

1. **Enter API Key Management**:
* Left menu "API Key" or visit `https://bailian.console.aliyun.com/?tab=model#/api-key`.


2. **Create New Key**:
* Click "Create API Key".
* Config:
* **Account**: Main account (Numeric ID).
* **Workspace**: Default Workspace.


* Click "Confirm".


3. **Copy and Save**:
* Format: `sk-xxxxxxxxxxxxxxxx`.
* ⚠️ Shows once only. Save safely.



### Step 5: Check Free Quota (New Users)

1. **Check Quota**:
* Click "Model Usage" or visit `https://bailian.console.aliyun.com/?tab=model#/model-usage/free-quota`.
* Click "Free Quota" tab.


2. **Enable "Stop when Exhausted"** (Recommended):
* Toggle "Stop when free quota exhausted" for the model.
* Prevents accidental charges.



> ⚠️ Updates hourly.

### Step 6: Account Top Up

1. **Enter Recharge Page**:
* Console top right "Expenses" or "Recharge".


2. **Select Amount**:
* Choose amount.
* Supports Alipay/WeChat/Bank Transfer.


3. **Complete Payment**.

### Step 7: Configure in TopVanAI

1. **Open TopVanAI Settings**: Settings ⚙️ → Models.
2. **Find Qwen**: Locate "Qwen" or "Tongyi Qianwen".
3. **Fill Info**:
* **Enable**: On.
* **API Key**: Paste Aliyun Key.
* **Base URL**: Default.
* **Model**: Select (e.g., qwen-plus, qwen-max).


4. **Test and Save**.

### Start Using

1. Select "Qwen" in the chat interface.
2. Start conversation.

---

## 🌙 Moonshot (Kimi) Configuration Tutorial

### Step 1: Register Moonshot

1. **Website**: `https://platform.moonshot.cn`
2. **Register**: Phone number registration.

### Step 2: Real-name Verification

1. **Enter Verification**: Avatar → "Real-name Verification".
2. **Fill Info**: Name, ID, Photos.
3. **Wait**.

### Step 3: Get API Key

1. **API Management**: Left menu → "API Key Management".
2. **Create Key**.
3. **Copy Save**.

### Step 4: Top Up

1. **Finance**: Left menu → "Account Top Up".
2. **Pay**.

### Step 5: Configure in TopVanAI

1. **Settings**: Models → Moonshot.
2. **Fill**: API Key, Base URL (default), Model.
3. **Test and Save**.

---

## 🎨 MiniMax Configuration Tutorial

### Step 1: Register MiniMax

1. **Website**: `https://platform.minimaxi.com`
2. **Register**.

### Step 2: Real-name Verification

1. **Enter Page**: Prompted after login.
2. **Fill Info**.
3. **Wait**.

### Step 3: Create Key

1. **Account Mgmt**: Left menu → "Account Management".
2. **Create**:
* Click "Interface Keys".
* Create new key.


3. **Copy**.

### Step 4: Top Up

1. **Top Up**: "Account Management" → "Balance" → "Recharge Now".

### Step 5: Configure in TopVanAI

1. **Settings**: Models → MiniMax.
2. **Fill**:
* **API Key**: Paste Key.
* **Group ID**: Paste Group ID (Required).
* **Base URL**: Default.
* **Model**.


3. **Test and Save**.

---

## ❓ FAQ

### 1. I already have an account, how to configure quickly?

**Step 1**: Log in to the provider, check:

* ✅ Is there a valid API Key?
* ✅ Is the balance sufficient?

**Step 2**: Open TopVanAI Settings → Models → Find provider.

**Step 3**: Fill Config: Switch On, Paste Key, Base URL, Test & Save.

**Quick Find**: Use links in [Configuration Overview](https://www.google.com/search?q=%23configuration-overview).

### 2. API Key says Invalid?

**Check**:

* Extra spaces?
* Key complete?
* Sufficient balance?
* Base URL correct?

**Fix**: Re-copy key, check balance, verify URL format.

### 3. Connection Failed?

| Error | Cause | Fix |
| --- | --- | --- |
| "API Key Invalid" | Key wrong/incomplete | Re-copy full key |
| "Insufficient Balance" | No money | Top up |
| "Network Error" | Internet issue | Check network |
| "Service Unavailable" | Provider down | Check provider website |

### 4. How to view billing?

**DeepSeek**: Background → Left menu "Consumption Details".
**Zhipu AI**: Console → "Account Balance" → "Records".
**Qwen**: Aliyun Console → "Expenses" → "Details".
**Moonshot**: Billing Center → "Records".

### 5. Can I configure multiple models?

Yes. You can switch between them in chat.

### 6. Lost API Key?

| Platform | View Again? | Fix |
| --- | --- | --- |
| DeepSeek | No | Delete old, create new |
| Zhipu AI | No | Create new |
| Qwen | Yes | View in API-KEY page |
| Moonshot | No | Create new |
| MiniMax | Yes | View in App Details |

### 7. Which provider to choose?

1. Check official websites for features.
2. Configure multiple and test.
3. Choose based on results.
