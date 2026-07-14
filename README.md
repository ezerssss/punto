# Punto

A loyalty program platform with a progressive mobile app and business dashboard aimed at increasing customer retention for Cebuano businesses. Customers scan receipts for rewards, employees verify transactions securely, and business owners access insights into customer behavior and program effectiveness.

🏷️ **Status:** Archived \
🤖 **Vibe Coded:** No

---

## What it does

- Customers scan your receipts, the employees verify the transaction, and customers gains points based on their total spending.
- PWAs for both customers and employees with TOTP mechanisms to prevent misuse and abuse.
- Portal for business owners to track rewards and orders.

## Demo / Screenshot

<!-- Add if you can. If the project can't run anymore, just leave a note: -->
<!-- ⚠️ Can't currently run this to generate a fresh screenshot — README text stands in for now. -->

<img width="6640" height="4080" alt="app_2" src="https://github.com/user-attachments/assets/82663e9e-fc2b-4a5e-a14c-70fd2c90334f" />
<img width="6640" height="4080" alt="app_3" src="https://github.com/user-attachments/assets/681d330b-8922-4ebf-9838-3c038d542875" />

## Tech Stack

Typescript · Next.js · Express · Firebase

## Notes

- I had to juggle around 4 different repositories (Portal, Customer PWA, Employee PWA, and the Server), so making one small change meant creating a lot of different changes to different repos which was a pain in the ass. 
- Next time I'll probably look into a monorepo so changing schemas isn't as painful as what I had to do here.
- Reached out to local cafes and restaurants to try and have them integrate Punto into their business.
