import { Component } from '@angular/core';
import { ProductSeederService } from 'src/app/services/product-seeder.service';

@Component({
  selector: 'app-seed-products',
  templateUrl: './seed-products.page.html',
  styleUrls: ['./seed-products.page.scss'],
  standalone: false,
})
export class SeedProductsPage {
  message = '';
  loading = false;

  constructor(private seeder: ProductSeederService) {}

  async seed() {
    this.loading = true;
    this.message = '';

    const products = [
  {
    title: 'Γάλα 1L',
    description: 'Φρέσκο γάλα πλήρες 1 λίτρου',
    price: 1.29,
    availability: true,
    stock: 120
  },
  {
    title: 'Ψωμί Ολικής',
    description: 'Ψωμί ολικής άλεσης σε φέτες',
    price: 1.8,
    availability: true,
    stock: 50
  },
  {
    title: 'Χυμός Πορτοκάλι',
    description: '100% φυσικός χυμός πορτοκάλι χωρίς ζάχαρη',
    price: 2.4,
    availability: false,
    stock: 0
  },
  {
    title: 'Ζάχαρη Λευκή 1kg',
    description: 'Κρυσταλλική ζάχαρη λευκή 1 κιλού',
    price: 1.1,
    availability: true,
    stock: 200
  },
  {
    title: 'Καφές στιγμιαίος 200g',
    description: 'Στιγμιαίος καφές σε γυάλινη συσκευασία',
    price: 3.9,
    availability: true,
    stock: 75
  },
  {
    title: 'Αλεύρι για όλες τις χρήσεις 1kg',
    description: 'Αλεύρι μαλακό για όλες τις χρήσεις',
    price: 1.05,
    availability: true,
    stock: 130
  },
  {
    title: 'Μακαρόνια Νο6 500g',
    description: 'Κλασικά μακαρόνια σπαγγέτι',
    price: 0.85,
    availability: true,
    stock: 220
  },
  {
    title: 'Ρύζι Καρολίνα 500g',
    description: 'Ρύζι για γεμιστά ή ριζότο',
    price: 1.2,
    availability: true,
    stock: 150
  },
  {
    title: 'Φακές Ψιλές 500g',
    description: 'Φακές ελληνικής παραγωγής',
    price: 1.6,
    availability: true,
    stock: 90
  },
  {
    title: 'Τοματοχυμός 500g',
    description: 'Τοματοπολτός για μαγειρική χρήση',
    price: 0.95,
    availability: true,
    stock: 80
  },
  {
    title: 'Σάλτσα ντομάτας βασιλικός 350g',
    description: 'Σάλτσα ντομάτας με βασιλικό',
    price: 1.75,
    availability: true,
    stock: 60
  },
  {
    title: 'Ελαιόλαδο έξτρα παρθένο 1L',
    description: 'Ελληνικό ελαιόλαδο εξαιρετικής ποιότητας',
    price: 6.9,
    availability: true,
    stock: 45
  },
  {
    title: 'Ηλιέλαιο 1L',
    description: 'Φυτικό έλαιο για τηγάνισμα και μαγείρεμα',
    price: 3.2,
    availability: true,
    stock: 55
  },
  {
    title: 'Αλάτι Ψιλό 500g',
    description: 'Ψιλό αλάτι μαγειρικής',
    price: 0.5,
    availability: true,
    stock: 200
  },
  {
    title: 'Πιπέρι Μαύρο Τριμμένο 50g',
    description: 'Μαύρο πιπέρι σε συσκευασία 50g',
    price: 0.9,
    availability: true,
    stock: 100
  },
  {
    title: 'Χαρτί Κουζίνας 2 ρολά',
    description: 'Απορροφητικό χαρτί κουζίνας',
    price: 1.45,
    availability: true,
    stock: 80
  },
  {
    title: 'Χαρτί Υγείας 6 ρολά',
    description: 'Απαλό χαρτί υγείας 6άρι',
    price: 2.5,
    availability: true,
    stock: 120
  },
  {
    title: 'Υγρό Πιάτων Λεμόνι 500ml',
    description: 'Υγρό πιάτων με άρωμα λεμονιού',
    price: 1.35,
    availability: true,
    stock: 70
  },
  {
    title: 'Απορρυπαντικό ρούχων 1.5L',
    description: 'Απορρυπαντικό πλυντηρίου για λευκά & χρωματιστά',
    price: 5.9,
    availability: true,
    stock: 40
  },
  {
    title: 'Μαλακτικό Ρούχων 1L',
    description: 'Αρωματικό μαλακτικό για ρούχα',
    price: 3.2,
    availability: true,
    stock: 65
  },
  {
    title: 'Οδοντόκρεμα 75ml',
    description: 'Οδοντόκρεμα φθορίου για καθημερινή χρήση',
    price: 2.3,
    availability: true,
    stock: 110
  },
  {
    title: 'Οδοντόβουρτσα Μέτρια',
    description: 'Οδοντόβουρτσα μέτριας σκληρότητας',
    price: 1.1,
    availability: true,
    stock: 90
  },
  {
    title: 'Σαμπουάν 400ml',
    description: 'Σαμπουάν για κανονικά μαλλιά',
    price: 3.8,
    availability: true,
    stock: 85
  },
  {
    title: 'Αφρόλουτρο 750ml',
    description: 'Αφρόλουτρο με άρωμα φρούτων',
    price: 2.9,
    availability: true,
    stock: 75
  },
  {
    title: 'Ξυραφάκια μιας χρήσης 5τμχ',
    description: 'Ατομικές ξυριστικές κεφαλές',
    price: 2.0,
    availability: true,
    stock: 50
  },
  {
    title: 'Σαπούνι 125g',
    description: 'Σαπούνι καθαρισμού χεριών και σώματος',
    price: 0.75,
    availability: true,
    stock: 150
  },
  {
    title: 'Μπισκότα Σοκολάτα 200g',
    description: 'Μπισκότα με κομμάτια σοκολάτας',
    price: 1.7,
    availability: true,
    stock: 100
  },
  {
    title: 'Πατατάκια Αλάτι 150g',
    description: 'Τραγανά πατατάκια με γεύση αλάτι',
    price: 1.2,
    availability: true,
    stock: 95
  },
  {
    title: 'Κρουασάν Σοκολάτα',
    description: 'Ατομικό κρουασάν γεμιστό',
    price: 0.6,
    availability: true,
    stock: 200
  },
  {
    title: 'Αναψυκτικό Κόλα 1.5L',
    description: 'Αναψυκτικό με καφεΐνη',
    price: 1.25,
    availability: true,
    stock: 110
  },
  {
    title: 'Νερό 6x1.5L',
    description: 'Φυσικό μεταλλικό νερό',
    price: 2.1,
    availability: true,
    stock: 180
  },
  {
    title: 'Κατεψυγμένη Πίτσα',
    description: 'Πίτσα πεπερόνι κατεψυγμένη',
    price: 3.5,
    availability: true,
    stock: 35
  },
  {
    title: 'Κατεψυγμένες Πατάτες 1kg',
    description: 'Τηγανιτές πατάτες κατεψυγμένες',
    price: 2.6,
    availability: true,
    stock: 70
  },
  {
    title: 'Φέτα τυρί 400g',
    description: 'Παραδοσιακή ελληνική φέτα',
    price: 4.9,
    availability: true,
    stock: 60
  },
  {
    title: 'Γιαούρτι στραγγιστό 2%',
    description: 'Στραγγιστό γιαούρτι 2% λιπαρά',
    price: 1.4,
    availability: true,
    stock: 85
  },
  {
    title: 'Αυγά Medium 6άδα',
    description: '6 αυγά μεσαίου μεγέθους',
    price: 2.0,
    availability: true,
    stock: 70
  },
  {
    title: 'Μήλα Κιλό',
    description: 'Μήλα ανά κιλό',
    price: 1.9,
    availability: true,
    stock: 90
  },
  {
    title: 'Μπανάνες Κιλό',
    description: 'Μπανάνες εισαγωγής',
    price: 1.5,
    availability: true,
    stock: 100
  },
  {
    title: 'Ντομάτες Κιλό',
    description: 'Φρέσκες κόκκινες ντομάτες',
    price: 1.8,
    availability: true,
    stock: 120
  },
  {
    title: 'Αγγούρια Τεμάχιο',
    description: 'Αγγούρια ελληνικά',
    price: 0.6,
    availability: true,
    stock: 150
  },
  {
    title: 'Κρεμμύδια Κιλό',
    description: 'Ξανθά ξερά κρεμμύδια',
    price: 0.9,
    availability: true,
    stock: 140
  },
  {
    title: 'Πατάτες Κιλό',
    description: 'Πατάτες για βραστά/τηγανητά',
    price: 0.75,
    availability: true,
    stock: 160
  },
  {
    title: 'Κοτόπουλο Φιλέτο Κιλό',
    description: 'Κοτόπουλο φιλέτο νωπό',
    price: 6.5,
    availability: true,
    stock: 30
  },
  {
    title: 'Χοιρινό Μπριζόλα Κιλό',
    description: 'Χοιρινή μπριζόλα με κόκαλο',
    price: 5.8,
    availability: true,
    stock: 25
  },
  {
    title: 'Αλλαντικά Γαλοπούλα 150g',
    description: 'Φέτες γαλοπούλας καπνιστής',
    price: 2.6,
    availability: true,
    stock: 70
  },
  {
    title: 'Τυρί Τοστ 200g',
    description: 'Τυρί τοστ με χαμηλά λιπαρά',
    price: 1.9,
    availability: true,
    stock: 80
  },
  {
    title: 'Βούτυρο αγελάδος 250g',
    description: 'Αγελαδινό βούτυρο ελληνικής παραγωγής',
    price: 2.3,
    availability: true,
    stock: 45
  }
];

    try {
      await this.seeder.seedProducts(products);
      this.message = '✅ Τα προϊόντα προστέθηκαν επιτυχώς!';
    } catch (err) {
      console.error(err);
      this.message = '❌ Σφάλμα κατά την εισαγωγή προϊόντων.';
    }

    this.loading = false;
  }
}
