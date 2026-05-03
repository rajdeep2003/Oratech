# Smartwatch Health Dashboard API Documentation

## 🌐 BASE CONFIG

Base URL: `http://localhost:3000/api/metrics` *(Note: Auth and Profile use `/api/auth` and `/api/profile` respectively)*
Auth: Bearer Token required

All responses follow this structure:
```json
{
  "success": true,
  "data": {},
  "meta": {
    "range": "1h",
    "count": 120
  }
}
```

## 1. Heart Rate

### 1. Heart Rate Metrics

**Purpose:** Gets heart rate history over time.

**Why the user should care:** Shows how hard your heart has been working.

**Endpoint:** `GET http://localhost:3000/api/metrics/heart_rate`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (24h, 7d, 30d). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2023-10-27T10:00:00Z",
      "hr_bpm": 72
    },
    {
      "timestamp": "2023-10-27T10:05:00Z",
      "hr_bpm": 75
    }
  ],
  "meta": {
    "range": "24h",
    "count": 2
  }
}
```

**What this API tells us:** Tells us the trend of user's heart rate across a given time window.

**Dashboard Usage:**

* **Primary metric(s):** Heart rate (BPM)
* **Chart type:** Line Chart
* **Why this chart:** Shows trends smoothly over time.
* **Visual priority:** High
* **UI placement:** Main dashboard
* **Interaction ideas:** Hover to see exact BPM at specific time.

**Key Insights:**

* Average heart rate is stable.
* Peaks correlate with high activity.

**Edge Cases / UI Notes:**

* **No data:** Show empty chart with 'No HR data'.
* **Noisy/invalid data:** Smooth out spikes.
* **Fallback UI:** Static line indicating last known value.

**Advanced:**

* **1 derived metric:** Resting Heart Rate (RHR)
* **1 alert condition:** Heart rate exceeds 120 BPM while resting.

---

## 2. HRV (IBI)

### 1. Latest HRV Metrics

**Purpose:** Gets the most recent HRV (RMSSD) and heart rate.

**Why the user should care:** Provides a quick health and recovery snapshot.

**Endpoint:** `GET http://localhost:3000/api/metrics/ibi/metrics/latest`

**Request Params:**

No request parameters.

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "hr_bpm": 65,
    "rmssd": 45,
    "ibi_ms": 920,
    "activity_state": "resting",
    "timestamp": "2023-10-27T10:00:00Z"
  },
  "meta": {
    "count": 1
  }
}
```

**What this API tells us:** Shows current recovery and stress level via HRV.

**Dashboard Usage:**

* **Primary metric(s):** RMSSD (ms)
* **Chart type:** Metric Card
* **Why this chart:** Immediate readability.
* **Visual priority:** High
* **UI placement:** Top of health summary
* **Interaction ideas:** Click to see detailed trend.

**Key Insights:**

* Current HRV is within normal range.
* Good recovery indicated.

**Edge Cases / UI Notes:**

* **No data:** Show 'Measuring...' or '--'
* **Noisy/invalid data:** Filter low quality beats.
* **Fallback UI:** Last valid reading with timestamp.

**Advanced:**

* **1 derived metric:** Stress/Recovery Score
* **1 alert condition:** RMSSD drops significantly below baseline.

---

### 2. HRV Window Data

**Purpose:** Gets continuous HR data for the last few minutes.

**Why the user should care:** Watch your real-time heart response.

**Endpoint:** `GET http://localhost:3000/api/metrics/ibi/window`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `duration` | `string` | No | Window duration (e.g., 5m). Default 5m. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2023-10-27T10:00:00Z",
      "hr": 65
    },
    {
      "timestamp": "2023-10-27T10:00:10Z",
      "hr": 66
    }
  ],
  "meta": {
    "range": "5m",
    "count": 2
  }
}
```

**What this API tells us:** Real-time variability of heart rate.

**Dashboard Usage:**

* **Primary metric(s):** Heart Rate (BPM)
* **Chart type:** Sparkline
* **Why this chart:** Great for quick live trends.
* **Visual priority:** Medium
* **UI placement:** Next to current HR card
* **Interaction ideas:** Scrub over line for values.

**Key Insights:**

* Heart rate is steady over the window.
* No major fluctuations.

**Edge Cases / UI Notes:**

* **No data:** Flat line
* **Noisy/invalid data:** Ignore artifacts.
* **Fallback UI:** Empty graph.

**Advanced:**

* **1 derived metric:** Heart Rate Variability (HRV)
* **1 alert condition:** Sudden unexplained HR spike.

---

### 3. HRV Summary

**Purpose:** Gets summary stats for RMSSD and HR.

**Why the user should care:** Quick overview of your recovery.

**Endpoint:** `GET http://localhost:3000/api/metrics/ibi/summary`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time window (e.g., 1h). Default 1h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "rmssd_avg": 42,
    "rmssd_min": 35,
    "rmssd_max": 50,
    "hr_avg": 68,
    "hr_min": 60,
    "hr_max": 80
  },
  "meta": {
    "range": "1h",
    "count": 1
  }
}
```

**What this API tells us:** Overall picture of stress and recovery over the given window.

**Dashboard Usage:**

* **Primary metric(s):** Average RMSSD
* **Chart type:** Text Stats
* **Why this chart:** Simple to digest.
* **Visual priority:** Medium
* **UI placement:** Details page
* **Interaction ideas:** None

**Key Insights:**

* Recovery is stable.
* Stress levels are manageable.

**Edge Cases / UI Notes:**

* **No data:** N/A
* **Noisy/invalid data:** Exclude dirty beats.
* **Fallback UI:** Show dashes.

**Advanced:**

* **1 derived metric:** Recovery Index
* **1 alert condition:** Average HR is unusually high.

---

### 4. HRV Trend

**Purpose:** Gets interval-bucketed HRV and HR data.

**Why the user should care:** See how your recovery changes over time.

**Endpoint:** `GET http://localhost:3000/api/metrics/ibi/trend`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time window (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2023-10-27T10:00:00Z",
      "rmssd": 45,
      "hr": 65
    }
  ],
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** Long-term trend of heart rate and variability.

**Dashboard Usage:**

* **Primary metric(s):** RMSSD over time
* **Chart type:** Bar or Line Chart
* **Why this chart:** Shows fluctuations clearly.
* **Visual priority:** Medium
* **UI placement:** HRV details section
* **Interaction ideas:** Zoom to specific hour.

**Key Insights:**

* HRV drops during intense activity.
* Recovers during sleep.

**Edge Cases / UI Notes:**

* **No data:** Empty chart
* **Noisy/invalid data:** Smooth data points.
* **Fallback UI:** Show 'No trend available'.

**Advanced:**

* **1 derived metric:** Daily HRV Baseline
* **1 alert condition:** Consistently low HRV over 3 days.

---

## 3. SpO2

### 1. Latest SpO2

**Purpose:** Gets the most recent blood oxygen level.

**Why the user should care:** Check if your blood has enough oxygen.

**Endpoint:** `GET http://localhost:3000/api/metrics/spo2/latest`

**Request Params:**

No request parameters.

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "spo2": 98,
    "perfusion_index": 1.2,
    "status": "normal",
    "timestamp": "2023-10-27T10:00:00Z"
  },
  "meta": {
    "count": 1
  }
}
```

**What this API tells us:** Current blood oxygenation status.

**Dashboard Usage:**

* **Primary metric(s):** SpO2 %
* **Chart type:** Gauge / Card
* **Why this chart:** Clear percentage view.
* **Visual priority:** High
* **UI placement:** Vitals Dashboard
* **Interaction ideas:** None

**Key Insights:**

* Oxygen levels are healthy.
* Good blood flow (perfusion).

**Edge Cases / UI Notes:**

* **No data:** Show '--%'
* **Noisy/invalid data:** Filter motion artifacts.
* **Fallback UI:** Show 'Measurement failed'.

**Advanced:**

* **1 derived metric:** Oxygen adequacy
* **1 alert condition:** SpO2 falls below 95%.

---

### 2. SpO2 Trend

**Purpose:** Gets a time-series of SpO2 readings.

**Why the user should care:** See if your oxygen drops at night or during workouts.

**Endpoint:** `GET http://localhost:3000/api/metrics/spo2/trend`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2023-10-27T10:00:00Z",
      "spo2": 98
    }
  ],
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** Stability of blood oxygen levels over time.

**Dashboard Usage:**

* **Primary metric(s):** SpO2 %
* **Chart type:** Line Chart
* **Why this chart:** Easy to spot dips.
* **Visual priority:** Medium
* **UI placement:** SpO2 Details
* **Interaction ideas:** Highlight dips.

**Key Insights:**

* Levels remain mostly stable.
* No significant drops detected.

**Edge Cases / UI Notes:**

* **No data:** Empty line chart
* **Noisy/invalid data:** Remove outlier drops.
* **Fallback UI:** No data message.

**Advanced:**

* **1 derived metric:** Nighttime Oxygen Variability
* **1 alert condition:** Multiple drops below 90% in one hour.

---

### 3. SpO2 Summary

**Purpose:** Gets aggregated SpO2 stats.

**Why the user should care:** Overall snapshot of your oxygen levels.

**Endpoint:** `GET http://localhost:3000/api/metrics/spo2/summary`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time window (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "avg_spo2": 97,
    "min_spo2": 94,
    "max_spo2": 100,
    "low_spo2_events": 0
  },
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** A quick look at average and worst-case oxygenation.

**Dashboard Usage:**

* **Primary metric(s):** Average SpO2
* **Chart type:** Text Summary
* **Why this chart:** Fast to read.
* **Visual priority:** Low
* **UI placement:** SpO2 Stats panel
* **Interaction ideas:** None

**Key Insights:**

* Average is healthy.
* No low events recorded.

**Edge Cases / UI Notes:**

* **No data:** N/A
* **Noisy/invalid data:** Ignore single extreme lows.
* **Fallback UI:** Show dashes.

**Advanced:**

* **1 derived metric:** Hypoxia risk score
* **1 alert condition:** Low SpO2 events > 5.

---

### 4. SpO2 Events

**Purpose:** Gets notable SpO2 drops or respiratory events.

**Why the user should care:** Alerts you to potential breathing issues.

**Endpoint:** `GET http://localhost:3000/api/metrics/spo2/events`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "type": "low_spo2",
      "timestamp": "2023-10-27T10:00:00Z",
      "value": 93
    }
  ],
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** Specific instances where oxygen dropped or breathing changed.

**Dashboard Usage:**

* **Primary metric(s):** Event count
* **Chart type:** List or Timeline
* **Why this chart:** Shows exactly when it happened.
* **Visual priority:** Medium
* **UI placement:** Health alerts
* **Interaction ideas:** Click event for details.

**Key Insights:**

* Breathing was normal.
* Isolated low reading.

**Edge Cases / UI Notes:**

* **No data:** Show 'No events'
* **Noisy/invalid data:** Ignore artifacts.
* **Fallback UI:** Empty list.

**Advanced:**

* **1 derived metric:** Breathing disturbance index
* **1 alert condition:** Frequent respiratory events detected.

---

## 4. Skin Temperature

### 1. Latest Temperature

**Purpose:** Gets current skin temperature.

**Why the user should care:** Check if you are running hot or cold.

**Endpoint:** `GET http://localhost:3000/api/metrics/temperature/latest`

**Request Params:**

No request parameters.

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "skin_temp": 36.5,
    "ambient_temp": 22.0,
    "delta": 0.2,
    "status": "normal",
    "timestamp": "2023-10-27T10:00:00Z"
  },
  "meta": {
    "count": 1
  }
}
```

**What this API tells us:** Current body temperature state.

**Dashboard Usage:**

* **Primary metric(s):** Skin Temp (°C)
* **Chart type:** Number Card
* **Why this chart:** Direct reading.
* **Visual priority:** High
* **UI placement:** Vitals Dashboard
* **Interaction ideas:** None

**Key Insights:**

* Temperature is normal.
* Environment is comfortable.

**Edge Cases / UI Notes:**

* **No data:** Show '--'
* **Noisy/invalid data:** Filter wild swings.
* **Fallback UI:** Show 'Not worn'.

**Advanced:**

* **1 derived metric:** Fever likelihood
* **1 alert condition:** Temperature > 37.5°C.

---

### 2. Temperature Trend

**Purpose:** Gets historical temperature readings.

**Why the user should care:** See your daily temperature cycles.

**Endpoint:** `GET http://localhost:3000/api/metrics/temperature/trend`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2023-10-27T10:00:00Z",
      "skin_temp": 36.5,
      "delta": 0.2
    }
  ],
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** How temperature changes throughout the day.

**Dashboard Usage:**

* **Primary metric(s):** Temperature delta
* **Chart type:** Line Chart
* **Why this chart:** Highlights shifts.
* **Visual priority:** Medium
* **UI placement:** Temp Details
* **Interaction ideas:** Hover for exact values.

**Key Insights:**

* Follows normal daily rhythm.
* Slight rise during afternoon.

**Edge Cases / UI Notes:**

* **No data:** Empty chart
* **Noisy/invalid data:** Smooth out noise.
* **Fallback UI:** No data message.

**Advanced:**

* **1 derived metric:** Circadian alignment
* **1 alert condition:** Prolonged elevation outside sickness.

---

### 3. Temperature Summary

**Purpose:** Gets aggregated temp stats.

**Why the user should care:** Quick overview of your temperature range.

**Endpoint:** `GET http://localhost:3000/api/metrics/temperature/summary`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time window (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "avg_skin_temp": 36.4,
    "min_skin_temp": 35.8,
    "max_skin_temp": 37.1,
    "avg_delta": 0.1
  },
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** General thermal state over the period.

**Dashboard Usage:**

* **Primary metric(s):** Average Temp
* **Chart type:** Text Stats
* **Why this chart:** Simple to understand.
* **Visual priority:** Low
* **UI placement:** Temp Details
* **Interaction ideas:** None

**Key Insights:**

* Averages are within normal limits.
* Max temp didn't cross fever threshold.

**Edge Cases / UI Notes:**

* **No data:** N/A
* **Noisy/invalid data:** Filter extremes.
* **Fallback UI:** Show dashes.

**Advanced:**

* **1 derived metric:** Thermal comfort index
* **1 alert condition:** Average temp is unusually low.

---

### 4. Circadian Split

**Purpose:** Compares day vs night temperature.

**Why the user should care:** See how your body cools down for sleep.

**Endpoint:** `GET http://localhost:3000/api/metrics/temperature/circadian`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time window (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "day_avg_temp": 36.5,
    "night_avg_temp": 36.1,
    "difference": 0.4
  },
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** Identifies expected nightly temperature drops.

**Dashboard Usage:**

* **Primary metric(s):** Temp Difference
* **Chart type:** Bar Chart (Day/Night)
* **Why this chart:** Easy comparison.
* **Visual priority:** Medium
* **UI placement:** Sleep/Temp section
* **Interaction ideas:** None

**Key Insights:**

* Body cools properly at night.
* Healthy circadian rhythm.

**Edge Cases / UI Notes:**

* **No data:** N/A
* **Noisy/invalid data:** Ignore poor sleep segments.
* **Fallback UI:** Show dashes.

**Advanced:**

* **1 derived metric:** Sleep efficiency proxy
* **1 alert condition:** Night temp is higher than day temp.

---

### 5. Temperature Events

**Purpose:** Detects fever or sudden temperature spikes.

**Why the user should care:** Alerts you if you might be getting sick.

**Endpoint:** `GET http://localhost:3000/api/metrics/temperature/events`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "type": "fever",
      "timestamp": "2023-10-27T10:00:00Z",
      "value": 38.1
    }
  ],
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** Instances of abnormal temperature activity.

**Dashboard Usage:**

* **Primary metric(s):** Event list
* **Chart type:** Alert List
* **Why this chart:** Draws attention.
* **Visual priority:** High
* **UI placement:** Health alerts
* **Interaction ideas:** Click for details.

**Key Insights:**

* Fever detected.
* Possible illness starting.

**Edge Cases / UI Notes:**

* **No data:** Show 'No events'
* **Noisy/invalid data:** Filter sensor errors.
* **Fallback UI:** Empty list.

**Advanced:**

* **1 derived metric:** Illness prediction
* **1 alert condition:** Spike > 1.0°C in short time.

---

## 5. Activity (Accelerometer)

### 1. Current Activity

**Purpose:** Gets your current movement status.

**Why the user should care:** See what you are doing right now.

**Endpoint:** `GET http://localhost:3000/api/metrics/activity/current`

**Request Params:**

No request parameters.

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "activity": "walking",
    "movement_level": "medium",
    "steps": 15,
    "timestamp": "2023-10-27T10:00:00Z"
  },
  "meta": {
    "count": 1
  }
}
```

**What this API tells us:** Current physical state of the user.

**Dashboard Usage:**

* **Primary metric(s):** Activity State
* **Chart type:** Icon/Text Card
* **Why this chart:** Quickest way to show state.
* **Visual priority:** High
* **UI placement:** Main dashboard
* **Interaction ideas:** None

**Key Insights:**

* Currently active.
* Moderate movement detected.

**Edge Cases / UI Notes:**

* **No data:** Show 'Unknown'
* **Noisy/invalid data:** Assume sedentary.
* **Fallback UI:** Show 'Resting'.

**Advanced:**

* **1 derived metric:** Active Calories Burned
* **1 alert condition:** Sudden lack of movement for too long.

---

### 2. Activity Summary

**Purpose:** Gets overall activity stats.

**Why the user should care:** See how active you've been.

**Endpoint:** `GET http://localhost:3000/api/metrics/activity/summary`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 1h). Default 1h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "total_steps": 1500,
    "active_minutes": 15,
    "sedentary_minutes": 45,
    "dominant_activity": "sitting"
  },
  "meta": {
    "range": "1h",
    "count": 1
  }
}
```

**What this API tells us:** High-level summary of movement vs rest.

**Dashboard Usage:**

* **Primary metric(s):** Total Steps / Active Mins
* **Chart type:** Summary Cards
* **Why this chart:** Standard fitness metrics.
* **Visual priority:** High
* **UI placement:** Activity Dashboard
* **Interaction ideas:** None

**Key Insights:**

* Mostly sedentary today.
* Needs more active minutes.

**Edge Cases / UI Notes:**

* **No data:** Show zeros
* **Noisy/invalid data:** Filter phantom steps.
* **Fallback UI:** Show zeros.

**Advanced:**

* **1 derived metric:** Daily Activity Score
* **1 alert condition:** Sedentary for > 2 hours.

---

### 3. Activity Trend

**Purpose:** Gets movement and steps over time.

**Why the user should care:** See your most active times of day.

**Endpoint:** `GET http://localhost:3000/api/metrics/activity/trend`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 1h). Default 1h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2023-10-27T10:00:00Z",
      "movement": 0.01,
      "steps": 100
    }
  ],
  "meta": {
    "range": "1h",
    "count": 1
  }
}
```

**What this API tells us:** When the user was moving and how intensely.

**Dashboard Usage:**

* **Primary metric(s):** Steps per minute
* **Chart type:** Bar Chart
* **Why this chart:** Great for showing volume.
* **Visual priority:** Medium
* **UI placement:** Activity Details
* **Interaction ideas:** Hover for step count.

**Key Insights:**

* Active mostly in the morning.
* Long sitting periods in afternoon.

**Edge Cases / UI Notes:**

* **No data:** Empty chart
* **Noisy/invalid data:** Smooth movement lines.
* **Fallback UI:** No data.

**Advanced:**

* **1 derived metric:** Peak Activity Time
* **1 alert condition:** Zero steps for entire day.

---

### 4. Step Count

**Purpose:** Gets total steps.

**Why the user should care:** Track your walking goal.

**Endpoint:** `GET http://localhost:3000/api/metrics/activity/steps`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "total_steps": 5000
  },
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** Total steps taken in the period.

**Dashboard Usage:**

* **Primary metric(s):** Total Steps
* **Chart type:** Progress Ring
* **Why this chart:** Shows progress to goal.
* **Visual priority:** High
* **UI placement:** Main dashboard
* **Interaction ideas:** None

**Key Insights:**

* On track for daily goal.
* Needs a walk.

**Edge Cases / UI Notes:**

* **No data:** Show 0
* **Noisy/invalid data:** Filter out driving 'steps'.
* **Fallback UI:** Show 0.

**Advanced:**

* **1 derived metric:** Step Goal Completion %
* **1 alert condition:** Steps < 1000 by 5 PM.

---

### 5. Activity Intensity

**Purpose:** Gets movement intensity level.

**Why the user should care:** See how hard you are working out.

**Endpoint:** `GET http://localhost:3000/api/metrics/activity/intensity`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 1h). Default 1h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "avg_intensity": 0.015,
    "max_intensity": 0.05,
    "level": "medium"
  },
  "meta": {
    "range": "1h",
    "count": 1
  }
}
```

**What this API tells us:** The physical exertion level.

**Dashboard Usage:**

* **Primary metric(s):** Intensity Level
* **Chart type:** Gauge
* **Why this chart:** Shows low/med/high clearly.
* **Visual priority:** Medium
* **UI placement:** Workout summary
* **Interaction ideas:** None

**Key Insights:**

* Moderate workout intensity.
* Good exertion.

**Edge Cases / UI Notes:**

* **No data:** Show 'Low'
* **Noisy/invalid data:** Filter sudden jerks.
* **Fallback UI:** Show 'Low'.

**Advanced:**

* **1 derived metric:** Exertion Load
* **1 alert condition:** Sustained high intensity > 30m.

---

### 6. Activity Distribution

**Purpose:** Gets time spent in different activities.

**Why the user should care:** See how your time is split between sitting, walking, etc.

**Endpoint:** `GET http://localhost:3000/api/metrics/activity/distribution`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "sitting": 60,
    "walking": 30,
    "running": 10
  },
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** Proportion of different activity types.

**Dashboard Usage:**

* **Primary metric(s):** Activity %
* **Chart type:** Pie/Donut Chart
* **Why this chart:** Perfect for distributions.
* **Visual priority:** Medium
* **UI placement:** Activity Details
* **Interaction ideas:** Hover for minutes.

**Key Insights:**

* Majority of time spent sitting.
* Good chunk of walking.

**Edge Cases / UI Notes:**

* **No data:** Empty chart
* **Noisy/invalid data:** Group unknown as other.
* **Fallback UI:** No data.

**Advanced:**

* **1 derived metric:** Sedentary Ratio
* **1 alert condition:** Sitting > 80%.

---

## 6. Gyroscope

### 1. Current Gyro

**Purpose:** Gets current stability and posture.

**Why the user should care:** Check your current body orientation.

**Endpoint:** `GET http://localhost:3000/api/metrics/gyro/current`

**Request Params:**

No request parameters.

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "stability": "stable",
    "posture": "upright",
    "timestamp": "2023-10-27T10:00:00Z"
  },
  "meta": {
    "count": 1
  }
}
```

**What this API tells us:** Real-time orientation and movement smoothness.

**Dashboard Usage:**

* **Primary metric(s):** Posture
* **Chart type:** Icon
* **Why this chart:** Shows orientation visually.
* **Visual priority:** Medium
* **UI placement:** Motion dashboard
* **Interaction ideas:** None

**Key Insights:**

* Currently upright.
* Stable movement.

**Edge Cases / UI Notes:**

* **No data:** Show 'Unknown'
* **Noisy/invalid data:** Filter quick twists.
* **Fallback UI:** Show 'Unknown'.

**Advanced:**

* **1 derived metric:** Fall Risk Indicator
* **1 alert condition:** Sudden drastic change in posture.

---

### 2. Stability

**Purpose:** Gets average rotation over time.

**Why the user should care:** See how steady your movements are.

**Endpoint:** `GET http://localhost:3000/api/metrics/gyro/stability`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 5m). Default 5m. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2023-10-27T10:00:00Z",
      "rotation": 5.2
    }
  ],
  "meta": {
    "range": "5m",
    "count": 1
  }
}
```

**What this API tells us:** Smoothness of arm/body movement.

**Dashboard Usage:**

* **Primary metric(s):** Rotation
* **Chart type:** Line Chart
* **Why this chart:** Shows stability trends.
* **Visual priority:** Low
* **UI placement:** Advanced Motion
* **Interaction ideas:** None

**Key Insights:**

* Movement is steady.
* No erratic swings.

**Edge Cases / UI Notes:**

* **No data:** Empty chart
* **Noisy/invalid data:** Filter noise.
* **Fallback UI:** No data.

**Advanced:**

* **1 derived metric:** Tremor Index
* **1 alert condition:** Consistently high rotation while at rest.

---

### 3. Posture Summary

**Purpose:** Gets time spent in different postures.

**Why the user should care:** See if you slouch or lie down too much.

**Endpoint:** `GET http://localhost:3000/api/metrics/gyro/posture-summary`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 1h). Default 1h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "upright": 45,
    "tilted": 10,
    "lying": 5
  },
  "meta": {
    "range": "1h",
    "count": 1
  }
}
```

**What this API tells us:** Time distribution of body orientation.

**Dashboard Usage:**

* **Primary metric(s):** Posture %
* **Chart type:** Donut Chart
* **Why this chart:** Shows split clearly.
* **Visual priority:** Medium
* **UI placement:** Motion Details
* **Interaction ideas:** None

**Key Insights:**

* Mostly upright.
* Some tilting detected.

**Edge Cases / UI Notes:**

* **No data:** Empty chart
* **Noisy/invalid data:** Ignore micro-movements.
* **Fallback UI:** No data.

**Advanced:**

* **1 derived metric:** Slouch Time
* **1 alert condition:** Tilted > 50%.

---

### 4. Gyro Intensity

**Purpose:** Gets rotation magnitude.

**Why the user should care:** See how intensely you are turning or moving.

**Endpoint:** `GET http://localhost:3000/api/metrics/gyro/intensity`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 1h). Default 1h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "avg_rotation": 15.2,
    "max_rotation": 45.0,
    "level": "medium"
  },
  "meta": {
    "range": "1h",
    "count": 1
  }
}
```

**What this API tells us:** The vigor of body rotations.

**Dashboard Usage:**

* **Primary metric(s):** Intensity Level
* **Chart type:** Text Stats
* **Why this chart:** Simple to read.
* **Visual priority:** Low
* **UI placement:** Motion Details
* **Interaction ideas:** None

**Key Insights:**

* Moderate turning.
* Safe movement levels.

**Edge Cases / UI Notes:**

* **No data:** Show 'Low'
* **Noisy/invalid data:** Filter sensor spikes.
* **Fallback UI:** Show 'Low'.

**Advanced:**

* **1 derived metric:** Agility Score
* **1 alert condition:** Max rotation > 100.

---

### 5. Gyro Events

**Purpose:** Detects sudden rotation spikes.

**Why the user should care:** Alerts you to possible slips or rapid turns.

**Endpoint:** `GET http://localhost:3000/api/metrics/gyro/events`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 5m). Default 5m. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "type": "rotation_spike",
      "timestamp": "2023-10-27T10:00:00Z",
      "value": 150
    }
  ],
  "meta": {
    "range": "5m",
    "count": 1
  }
}
```

**What this API tells us:** Sudden, sharp movements.

**Dashboard Usage:**

* **Primary metric(s):** Event list
* **Chart type:** Alert List
* **Why this chart:** Highlights issues.
* **Visual priority:** High
* **UI placement:** Safety alerts
* **Interaction ideas:** None

**Key Insights:**

* Sudden turn detected.
* Possible slip.

**Edge Cases / UI Notes:**

* **No data:** Show 'No events'
* **Noisy/invalid data:** Filter standard sports moves.
* **Fallback UI:** Empty list.

**Advanced:**

* **1 derived metric:** Fall Detection
* **1 alert condition:** Extreme rotation spike followed by stillness.

---

### 6. Orientation

**Purpose:** Gets downsampled orientation data.

**Why the user should care:** Visualize your arm's position.

**Endpoint:** `GET http://localhost:3000/api/metrics/gyro/orientation`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 5m). Default 5m. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2023-10-27T10:00:00Z",
      "yaw": 10,
      "pitch": 20,
      "roll": 5
    }
  ],
  "meta": {
    "range": "5m",
    "count": 1
  }
}
```

**What this API tells us:** 3D position of the wrist.

**Dashboard Usage:**

* **Primary metric(s):** Pitch/Roll
* **Chart type:** Multi-line Chart
* **Why this chart:** Shows angles over time.
* **Visual priority:** Low
* **UI placement:** Developer / Advanced
* **Interaction ideas:** None

**Key Insights:**

* Arm is mostly horizontal.
* Regular swinging motion.

**Edge Cases / UI Notes:**

* **No data:** Empty chart
* **Noisy/invalid data:** Smooth angles.
* **Fallback UI:** No data.

**Advanced:**

* **1 derived metric:** Arm Swing Symmetry
* **1 alert condition:** Irregular roll angles during walking.

---

## 7. Stress (EDA)

### 1. Current Stress

**Purpose:** Gets current stress level based on skin sweat.

**Why the user should care:** See if you are currently stressed or relaxed.

**Endpoint:** `GET http://localhost:3000/api/metrics/stress/current`

**Request Params:**

No request parameters.

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "eda_microsiemens": 2.5,
    "state": "relaxed",
    "timestamp": "2023-10-27T10:00:00Z"
  },
  "meta": {
    "count": 1
  }
}
```

**What this API tells us:** Immediate physiological arousal/stress.

**Dashboard Usage:**

* **Primary metric(s):** Stress State
* **Chart type:** Color-coded Card
* **Why this chart:** Instant recognition (Green/Red).
* **Visual priority:** High
* **UI placement:** Main Dashboard
* **Interaction ideas:** None

**Key Insights:**

* Currently relaxed.
* Low skin conductance.

**Edge Cases / UI Notes:**

* **No data:** Show 'Unknown'
* **Noisy/invalid data:** Filter loose contact.
* **Fallback UI:** Show 'Measuring...'

**Advanced:**

* **1 derived metric:** Arousal Index
* **1 alert condition:** State changes to 'elevated'.

---

### 2. Stress Trend

**Purpose:** Gets stress levels over time.

**Why the user should care:** See when you were most stressed today.

**Endpoint:** `GET http://localhost:3000/api/metrics/stress/trend`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 5m). Default 5m. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2023-10-27T10:00:00Z",
      "eda": 2.5
    }
  ],
  "meta": {
    "range": "5m",
    "count": 1
  }
}
```

**What this API tells us:** How stress fluctuates over a period.

**Dashboard Usage:**

* **Primary metric(s):** EDA Value
* **Chart type:** Line Chart
* **Why this chart:** Shows peaks and valleys.
* **Visual priority:** Medium
* **UI placement:** Stress Details
* **Interaction ideas:** Hover for values.

**Key Insights:**

* Stress peaked during the meeting.
* Calmed down after.

**Edge Cases / UI Notes:**

* **No data:** Empty chart
* **Noisy/invalid data:** Smooth baseline drift.
* **Fallback UI:** No data.

**Advanced:**

* **1 derived metric:** Stress Load
* **1 alert condition:** Consistent high EDA for > 1hr.

---

### 3. Stress Summary

**Purpose:** Gets overall stress stats.

**Why the user should care:** Quick overview of your daily stress.

**Endpoint:** `GET http://localhost:3000/api/metrics/stress/summary`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 5m). Default 5m. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "avg_eda": 3.0,
    "min_eda": 1.5,
    "max_eda": 6.0,
    "overall_state": "normal"
  },
  "meta": {
    "range": "5m",
    "count": 1
  }
}
```

**What this API tells us:** General stress level for the period.

**Dashboard Usage:**

* **Primary metric(s):** Average State
* **Chart type:** Text Stats
* **Why this chart:** Simple summary.
* **Visual priority:** Medium
* **UI placement:** Stress Summary
* **Interaction ideas:** None

**Key Insights:**

* Overall normal stress.
* Manageable levels.

**Edge Cases / UI Notes:**

* **No data:** N/A
* **Noisy/invalid data:** Filter outliers.
* **Fallback UI:** Show dashes.

**Advanced:**

* **1 derived metric:** Daily Stress Score
* **1 alert condition:** Max EDA is unusually high.

---

### 4. Stress Events

**Purpose:** Detects sudden stress spikes.

**Why the user should care:** Alerts you to moments of high anxiety or excitement.

**Endpoint:** `GET http://localhost:3000/api/metrics/stress/events`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 5m). Default 5m. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "type": "stress_spike",
      "timestamp": "2023-10-27T10:00:00Z",
      "value": 8.5
    }
  ],
  "meta": {
    "range": "5m",
    "count": 1
  }
}
```

**What this API tells us:** Moments of sudden physiological arousal.

**Dashboard Usage:**

* **Primary metric(s):** Event list
* **Chart type:** Alert List
* **Why this chart:** Shows key moments.
* **Visual priority:** High
* **UI placement:** Stress alerts
* **Interaction ideas:** None

**Key Insights:**

* Sudden spike detected.
* Possible stressful event.

**Edge Cases / UI Notes:**

* **No data:** Show 'No events'
* **Noisy/invalid data:** Filter motion artifacts.
* **Fallback UI:** Empty list.

**Advanced:**

* **1 derived metric:** Anxiety Trigger Count
* **1 alert condition:** More than 3 spikes in an hour.

---

### 5. Stress Distribution

**Purpose:** Gets time spent in different stress states.

**Why the user should care:** See how much of your day is relaxed vs stressed.

**Endpoint:** `GET http://localhost:3000/api/metrics/stress/distribution`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 5m). Default 5m. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "relaxed": 70,
    "normal": 20,
    "elevated": 10
  },
  "meta": {
    "range": "5m",
    "count": 1
  }
}
```

**What this API tells us:** Proportion of time in different stress zones.

**Dashboard Usage:**

* **Primary metric(s):** State %
* **Chart type:** Stacked Bar / Donut
* **Why this chart:** Good for ratios.
* **Visual priority:** Medium
* **UI placement:** Stress Details
* **Interaction ideas:** None

**Key Insights:**

* Mostly relaxed.
* Small portion of elevated stress.

**Edge Cases / UI Notes:**

* **No data:** Empty chart
* **Noisy/invalid data:** Default to normal if unsure.
* **Fallback UI:** No data.

**Advanced:**

* **1 derived metric:** Chronic Stress Indicator
* **1 alert condition:** Elevated > 40%.

---

### 6. Stress Reactivity

**Purpose:** Gets number of spikes and reactivity level.

**Why the user should care:** See how easily you get stressed.

**Endpoint:** `GET http://localhost:3000/api/metrics/stress/reactivity`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 5m). Default 5m. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "spike_count": 2,
    "reactivity_level": "moderate"
  },
  "meta": {
    "range": "5m",
    "count": 1
  }
}
```

**What this API tells us:** How volatile the user's stress response is.

**Dashboard Usage:**

* **Primary metric(s):** Reactivity Level
* **Chart type:** Gauge or Text
* **Why this chart:** Simple to understand.
* **Visual priority:** Low
* **UI placement:** Stress Details
* **Interaction ideas:** None

**Key Insights:**

* Moderate reactivity.
* Normal emotional response.

**Edge Cases / UI Notes:**

* **No data:** Show 'Low'
* **Noisy/invalid data:** Filter exercise sweat.
* **Fallback UI:** Show 'Unknown'.

**Advanced:**

* **1 derived metric:** Emotional Lability
* **1 alert condition:** High reactivity level continuously.

---

## 8. PPG / Skin Contact

### 1. Current PPG & Contact

**Purpose:** Gets current sensor contact quality.

**Why the user should care:** Check if you are wearing the watch correctly.

**Endpoint:** `GET http://localhost:3000/api/metrics/ppg/current`

**Request Params:**

No request parameters.

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "wearing_status": "ON_WRIST",
    "signal_quality": "good",
    "timestamp": "2023-10-27T10:00:00Z"
  },
  "meta": {
    "count": 1
  }
}
```

**What this API tells us:** Whether the device is being worn properly and getting good data.

**Dashboard Usage:**

* **Primary metric(s):** Wearing Status
* **Chart type:** Status Indicator (Green/Red dot)
* **Why this chart:** Instant feedback.
* **Visual priority:** High
* **UI placement:** Device settings/Header
* **Interaction ideas:** None

**Key Insights:**

* Watch is worn correctly.
* Good signal quality.

**Edge Cases / UI Notes:**

* **No data:** Show 'OFF_WRIST'
* **Noisy/invalid data:** Ignore brief disconnects.
* **Fallback UI:** Show 'Unknown'.

**Advanced:**

* **1 derived metric:** Wear Confidence
* **1 alert condition:** Status changes to 'OFF_WRIST'.

---

### 2. Signal Trend

**Purpose:** Gets signal quality over time.

**Why the user should care:** See if the sensor is reading well.

**Endpoint:** `GET http://localhost:3000/api/metrics/ppg/signal-trend`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 1h). Default 1h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2023-10-27T10:00:00Z",
      "perfusion_index": 1.5,
      "quality": 95
    }
  ],
  "meta": {
    "range": "1h",
    "count": 1
  }
}
```

**What this API tells us:** Consistency of sensor readings.

**Dashboard Usage:**

* **Primary metric(s):** Quality %
* **Chart type:** Line Chart
* **Why this chart:** Shows stability.
* **Visual priority:** Low
* **UI placement:** Device Diagnostics
* **Interaction ideas:** None

**Key Insights:**

* Signal is consistently strong.
* Good blood flow detected.

**Edge Cases / UI Notes:**

* **No data:** Empty chart
* **Noisy/invalid data:** Smooth drops.
* **Fallback UI:** No data.

**Advanced:**

* **1 derived metric:** Data Reliability %
* **1 alert condition:** Quality drops below 50%.

---

### 3. Wear Detection

**Purpose:** Gets wear compliance stats.

**Why the user should care:** See how often you wear your watch.

**Endpoint:** `GET http://localhost:3000/api/metrics/ppg/wear-detection`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "compliance_percent": 90,
    "on_wrist_minutes": 1300,
    "off_wrist_minutes": 140
  },
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** How much of the day the user actually wore the device.

**Dashboard Usage:**

* **Primary metric(s):** Compliance %
* **Chart type:** Progress Bar
* **Why this chart:** Shows adherence.
* **Visual priority:** Medium
* **UI placement:** Device Settings
* **Interaction ideas:** None

**Key Insights:**

* Excellent wear compliance.
* Device taken off for charging.

**Edge Cases / UI Notes:**

* **No data:** Show 0%
* **Noisy/invalid data:** Filter charging state.
* **Fallback UI:** Show dashes.

**Advanced:**

* **1 derived metric:** Daily Adherence
* **1 alert condition:** Compliance < 50%.

---

### 4. Quality Summary

**Purpose:** Gets distribution of signal quality.

**Why the user should care:** See how much of your data is reliable.

**Endpoint:** `GET http://localhost:3000/api/metrics/ppg/quality-summary`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "good": 80,
    "medium": 15,
    "poor": 5
  },
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** Overall trustworthiness of the health data collected.

**Dashboard Usage:**

* **Primary metric(s):** Quality Distribution
* **Chart type:** Stacked Bar
* **Why this chart:** Easy to see ratios.
* **Visual priority:** Low
* **UI placement:** Data Quality Info
* **Interaction ideas:** None

**Key Insights:**

* Most data is highly reliable.
* Small amount of poor signal.

**Edge Cases / UI Notes:**

* **No data:** Empty chart
* **Noisy/invalid data:** Ignore OFF_WRIST time.
* **Fallback UI:** No data.

**Advanced:**

* **1 derived metric:** Usable Data Ratio
* **1 alert condition:** Poor > 30%.

---

### 5. Artifacts

**Purpose:** Gets moments of motion interference.

**Why the user should care:** See when your movement disrupted readings.

**Endpoint:** `GET http://localhost:3000/api/metrics/ppg/artifacts`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 1h). Default 1h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2023-10-27T10:00:00Z",
      "duration_sec": 30
    }
  ],
  "meta": {
    "range": "1h",
    "count": 1
  }
}
```

**What this API tells us:** Times when data might be inaccurate due to movement.

**Dashboard Usage:**

* **Primary metric(s):** Artifact count
* **Chart type:** List or Scatter plot
* **Why this chart:** Shows disruptions.
* **Visual priority:** Low
* **UI placement:** Diagnostics
* **Interaction ideas:** None

**Key Insights:**

* Few artifacts detected.
* Clean reading period.

**Edge Cases / UI Notes:**

* **No data:** Show 'No artifacts'
* **Noisy/invalid data:** Debounce short movements.
* **Fallback UI:** Empty list.

**Advanced:**

* **1 derived metric:** Interference Rate
* **1 alert condition:** Frequent artifacts during sleep.

---

### 6. Reliability Score

**Purpose:** Gets overall data reliability score.

**Why the user should care:** Know if you can trust your health stats today.

**Endpoint:** `GET http://localhost:3000/api/metrics/ppg/reliability-score`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | No | Time range (e.g., 24h). Default 24h. |

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "reliability_score": 85
  },
  "meta": {
    "range": "24h",
    "count": 1
  }
}
```

**What this API tells us:** A single metric for overall confidence in the day's data.

**Dashboard Usage:**

* **Primary metric(s):** Score (0-100)
* **Chart type:** Gauge
* **Why this chart:** Quick read.
* **Visual priority:** Medium
* **UI placement:** Health Summary Footer
* **Interaction ideas:** None

**Key Insights:**

* High reliability.
* Data can be trusted.

**Edge Cases / UI Notes:**

* **No data:** Show '--'
* **Noisy/invalid data:** Filter off-wrist.
* **Fallback UI:** Show '--'.

**Advanced:**

* **1 derived metric:** Confidence Index
* **1 alert condition:** Score < 60.

---

## 9. Auth & Profile

### 1. User Signup

**Purpose:** Creates a new user account.

**Why the user should care:** Join the platform to track your health.

**Endpoint:** `POST http://localhost:3000/api/auth/signup`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | `string` | Yes | User email. |
| `password` | `string` | Yes | User password. |

**Sample Request JSON:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "email": "user@example.com"
    },
    "token": "jwt_token_here"
  },
  "meta": {
    "range": "N/A",
    "count": 1
  }
}
```

**What this API tells us:** Registers a user and provides initial auth token.

**Dashboard Usage:**

* **Primary metric(s):** Signup Success
* **Chart type:** Form
* **Why this chart:** Standard login flow.
* **Visual priority:** High
* **UI placement:** Onboarding
* **Interaction ideas:** Submit button.

**Key Insights:**

* User registered successfully.
* Email verified.

**Edge Cases / UI Notes:**

* **No data:** Show error
* **Noisy/invalid data:** Validate email format.
* **Fallback UI:** Retry form.

**Advanced:**

* **1 derived metric:** Conversion Rate
* **1 alert condition:** Signup failed.

---

### 2. User Login

**Purpose:** Authenticates an existing user.

**Why the user should care:** Log in to view your dashboard.

**Endpoint:** `POST http://localhost:3000/api/auth/login`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | `string` | Yes | User email. |
| `password` | `string` | Yes | User password. |

**Sample Request JSON:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "email": "user@example.com"
    },
    "token": "jwt_token_here"
  },
  "meta": {
    "range": "N/A",
    "count": 1
  }
}
```

**What this API tells us:** Authenticates the user and sets up the session.

**Dashboard Usage:**

* **Primary metric(s):** Login Success
* **Chart type:** Form
* **Why this chart:** Standard login flow.
* **Visual priority:** High
* **UI placement:** Login Page
* **Interaction ideas:** Submit button.

**Key Insights:**

* User logged in successfully.

**Edge Cases / UI Notes:**

* **No data:** Show error
* **Noisy/invalid data:** Handle bad credentials.
* **Fallback UI:** Retry form.

**Advanced:**

* **1 derived metric:** Login Success Rate
* **1 alert condition:** Multiple failed attempts.

---

### 3. Bulk Signup

**Purpose:** Registers multiple users at once.

**Why the user should care:** For administrators to onboard teams.

**Endpoint:** `POST http://localhost:3000/api/auth/bulk-signup`

**Request Params:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `users` | `array` | Yes | List of user email/password pairs. |

**Sample Request JSON:**
```json
{
  "users": [
    {
      "email": "u1@test.com",
      "password": "pw1"
    },
    {
      "email": "u2@test.com",
      "password": "pw2"
    }
  ]
}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "created_count": 2,
    "failed_count": 0
  },
  "meta": {
    "range": "N/A",
    "count": 2
  }
}
```

**What this API tells us:** Batch creates user accounts.

**Dashboard Usage:**

* **Primary metric(s):** Success Rate
* **Chart type:** Table
* **Why this chart:** Shows status of each creation.
* **Visual priority:** Low
* **UI placement:** Admin Dashboard
* **Interaction ideas:** None

**Key Insights:**

* Users onboarded quickly.

**Edge Cases / UI Notes:**

* **No data:** Show error
* **Noisy/invalid data:** Validate list.
* **Fallback UI:** Retry failed rows.

**Advanced:**

* **1 derived metric:** Batch Success Rate
* **1 alert condition:** Bulk upload completely failed.

---

### 4. Get Profile (Me)

**Purpose:** Gets the current user's profile.

**Why the user should care:** View your personal account details.

**Endpoint:** `GET http://localhost:3000/api/profile/me`

**Request Params:**

No request parameters.

**Sample Request JSON:**
```json
{}
```

**Sample Response JSON:**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2023-01-01T00:00:00Z"
  },
  "meta": {
    "range": "N/A",
    "count": 1
  }
}
```

**What this API tells us:** Returns the authenticated user's profile information.

**Dashboard Usage:**

* **Primary metric(s):** User Details
* **Chart type:** Profile Card
* **Why this chart:** Displays personal info.
* **Visual priority:** Medium
* **UI placement:** Settings/Profile Page
* **Interaction ideas:** Edit details.

**Key Insights:**

* Profile is active and complete.

**Edge Cases / UI Notes:**

* **No data:** Show error
* **Noisy/invalid data:** Handle missing fields.
* **Fallback UI:** Show default avatar.

**Advanced:**

* **1 derived metric:** Profile Completion %
* **1 alert condition:** Account suspended.

---
