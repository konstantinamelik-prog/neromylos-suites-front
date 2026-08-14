# Neromylos Suites — Frontend

React + TypeScript frontend για το Neromylos Suites, boutique κατάλυμα στο Πολύδροσο Παρνασσού. 
Επικοινωνεί με το [NeromylosSuitesRestApi](https://github.com/konstantinamelik-prog/NeromylosSuitesRestApi) backend.

## Τεχνολογίες

- **React** + **Vite** + **TypeScript**
- **react-router** (v7) για routing
- **Tailwind CSS** (v4, CSS-first config) + **shadcn/ui** components
- **react-hook-form** + **zod** για forms/validation
- **sonner** για toast notifications
- **js-cookie** + **jwt-decode** για authentication

## Setup

1. Clone το repository:
   ```
   git clone https://github.com/konstantinamelik-prog/neromylos-suites-front.git
   cd neromylos-suites-front
   ```
   
2. Εγκατάσταση dependencies:
   ```
   npm install
   ```

3. Δημιούργησε ένα `.env` αρχείο στη ρίζα του project:
   ```
   VITE_API_URL=http://localhost:8081/api/v1
   ```
   (Άλλαξε το port αν το backend σου τρέχει αλλού — βλέπε το `APP_PORT` στο `.env` του backend.)

4. Βεβαιώσου ότι το backend τρέχει (`docker compose up` στο backend repo) **πριν** ξεκινήσεις το frontend.

5. Ξεκίνα τον dev server:
   ```
   npm run dev
   ```
   Το site θα είναι διαθέσιμο στο `http://localhost:5173` (ή `5174` αν
   το 5173 είναι ήδη σε χρήση — το Vite terminal output θα σου δείξει
   ακριβώς ποιο port χρησιμοποιεί).

## Δοκιμή ως Admin / Receptionist

Δεν υπάρχει δημόσια εγγραφή για ADMIN/RECEPTIONIST λογαριασμούς (σκόπιμος περιορισμός, δες το README του backend). Για να δοκιμάσεις το `/admin/bookings` και `/admin/members`:

1. Κάνε εγγραφή κανονικά μέσα από το `/register` (δημιουργεί λογαριασμό GUEST).
2. Προήγαγε τον λογαριασμό σε ADMIN/RECEPTIONIST απευθείας στη βάση (δες βήμα 7 στο README του backend).
3. Κάνε login ξανά στο frontend — το navbar θα δείχνει "Διαχείριση κρατήσεων" αντί για "Οι κρατήσεις μου".

## Δομή project

Feature-based οργάνωση, όχι page-based — κάθε domain (auth, bookings, members, rooms) έχει τον δικό του φάκελο μέσα στο `features/`, ανεξάρτητα από routing:

```
src/
  features/
    auth/           login, register, AuthProvider (context), JWT decoding
    bookings/       αναζήτηση διαθεσιμότητας, δημιουργία κράτησης, admin listing
    members/        admin listing/διαγραφή μελών
    rooms/          preview δωματίων στην αρχική + στατικά δεδομένα δωματίων
  pages/            μία σελίδα ανά route (HomePage/ είναι φάκελος - έχει πολλά
                     page-local components· τα υπόλοιπα είναι flat .tsx αρχεία)
  shared/
    layout/         Header, Footer, Layout, RouterLayout, ProtectedRoute, AdminTabs
    lib/            μικρά, καθαρά utilities (cookies, ημερομηνίες)
  App.tsx           routes
  main.tsx          root: BrowserRouter, AuthProvider, Toaster
```

**Κανόνας φακέλων:** φάκελος μόνο όταν υπάρχουν πραγματικά πάνω από ένα σχετικά αρχεία — αλλιώς flat `.tsx`/`.ts` αρχείο απευθείας στο parent folder (π.χ. `pages/LoginPage.tsx`, όχι `pages/LoginPage/LoginPage.tsx` + `index.ts`).

## Γνωστοί περιορισμοί / μελλοντικές βελτιώσεις

- **Χωρίς i18n** — το site είναι μόνο στα Ελληνικά. Δομικά έτοιμο να προστεθεί αγγλική μετάφραση αργότερα (`react-i18next`), αλλά δεν έχει γίνει ακόμα λόγω χρόνου.
- **Sorting σε admin πίνακες**: το `/admin/bookings` υποστηρίζει πραγματικό backend sorting σε όλο το dataset. Το "Ονοματεπώνυμο" δεν είναι sortable (δεν είναι άμεσο πεδίο στο `Booking`, προέρχεται είτε από `User` είτε από `Visitor`).
- **Δεν υπάρχει ακόμα mobile/responsive έλεγχος** σε βάθος — το site δουλεύει σε desktop, χρειάζεται περαιτέρω προσαρμογή για μικρές οθόνες.
