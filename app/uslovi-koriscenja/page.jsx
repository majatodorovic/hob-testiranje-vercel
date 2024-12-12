import Footer from "@/components/Footer/Footer";
import Link from "next/link";

export const metadata = () => {
  return {
    title: "Uslovi korišćenja | HOB",
    description: "Dobrodošli na houseofbeauty.com Online Shop",
    keywords: ["House of beauty"],
  };
};
const UsloviKoriscenja = () => {
  return (
    <>
      <div className="mx-auto mt-[1.2rem] w-[95%] md:mt-[9rem] md:w-[60%]">
        <h1 className="pb-10 text-center text-[40px] uppercase text-[#191919] max-md:text-[1rem]">
          Uslovi korišćenja{" "}
        </h1>

        <p className="mt-2">
          Korišćenjem internet sajta i kupovinom proizvoda preko on-line
          prodavnice www.hobbrandgroup.rs potvrđujete da ste pročitali, razumeli
          i prihvatili, naše uslove korišćenja i da ste saglasni da ih poštujete
          u celosti.
        </p>
        <p className="mt-1">
          U slučaju da vam naša pravila ne odgovaraju ili se sa njima ne slažete
          u potpunosti molimo vas da ne koristite ove stranice. Web sajt
          www.hobbrandgroup.rs je vlasništvo kompanije HOB BRAND GROUP DOO i
          kompanija kao vlasnik sajta zadržava sva prava da u bilo koje vreme
          ažurira, menja i modifikuje uslove korišćenja.
        </p>
        <p className="mt-1">
          Sav materijal sa sajta www.hobbrandgroup.rs ne može biti kopiran i
          korišćen u bilo koje druge svrhe i na bilo koji način bez prethodne
          dozvole odgovornog lica kompanije HOB BRAND GROUP DOO.
        </p>
        <p className="mt-1">
          Svako neovlašćeno korišćenje materijala sa web sajta
          www.hobbrandgroup.rs može prekršiti zakone o autorskim pravima,
          intelektualnoj svojini, zaštitnim znacima i drugim zakonima.
        </p>

        <p className="mt-1">
          Ukoliko sajt ne koristite po svim lokalnim, republičkim zakonima
          Republike Srbije i predstavljate se lažnim imenima ili podacima, HOB
          BRAND GROUP DOO ima sva prava da ukine, privremeno obustavi ili
          modifikuje vaš nalog ili pristup web sajtu ili delovima web sajta bez
          prethodne najave.
        </p>

        <p className="mt-1">
          Sav sadržaj i informacije na web sajtu www.hobbrandgroup.rs su
          napravljene samo za informativne potrebe i uglavnom su korišćeni opisi
          proizvoda od strane proizvođača. Slike proizvoda takođe su date zbog
          informativne upotrebe. Nijanse boja koje su prikazane na slikama ne
          moraju da odgovaraju potpuno bojama u stvarnosti i zavise od
          kalibracije boja vašeg uređaja za pregled ovog sajta.
        </p>

        <h5 className="mt-4 text-[20px]">Podaci kompanije</h5>
        <ul className="mt-2">
          <li>
            <span className="font-semibold">Naziv:</span> HOB BRAND GROUP DOO
          </li>
          <li>
            <span className="font-semibold">Adresa:</span> Sinđlićeva 25, lokal
            8, 32000 Čačak E-mail: info@hobbrandgroup.rs
          </li>
          <li>
            <span className="font-semibold">Telefoni:</span> +381 32 365 934;
            +381 60 0 365 934
          </li>
          <li>
            <span className="font-semibold">PIB:</span> 111259968
          </li>
          <li>
            <span className="font-semibold">Matični broj:</span> 21451142
          </li>
          <li>
            <span className="font-semibold">Šifra delatnosti:</span> 4645
            Trgovina na veliko parfimerijskim i kozmetičkim proizvodima
          </li>
          <li>
            <span className="font-semibold">Transakcioni račun:</span> Banca
            Intesa A.D.- Beograd 160-6000000253156-91
          </li>
        </ul>
        <h5 className="mt-4 text-[20px]">Način poručivanja</h5>
        <p>
          Sve naše proizvode možete poručiti putem naše on-line prodavnice na
          adresi www.hobbrandgroup.rs, jednostavnim izborom odgovarajućeg
          proizvoda i njegove količine, a zatim dodavanjem u Korpu. Nakon toga
          možete nastaviti dalju kupovinu izborom novih proizvoda ili preći na
          poručivanje i plaćanje. Detaljan opis procesa poručivanja možete
          pogledati na strani{" "}
          <Link href="kako-kupiti" className="font-semibold underline">
            Kako poručiti proizvod
          </Link>
          .
        </p>
        <h5 className="mt-4 text-[20px]">Način plaćanja</h5>
        <p className="mt-3 font-semibold">1. Plaćanje pouzećem</p>
        <p className="mt-1">
          Kod plaćanja pouzećem, ukupan iznos porudžbine (vrednost pošiljke +
          troškove dostave) plaćate kurirskoj službi prilikom preuzimanja
          pošiljke.
        </p>
        <p className="mt-3 font-semibold">2. Plaćanje preko računa</p>
        <p className="mt-1">
          Svoju porudžbinu možete platiti direktnom uplatom na račun HOB BRAND
          GROUP DOO, uz obavezno navođenje odgovarajućeg poziva na broj koji se
          generiše prilikom poručivanja. Plaćanje možete izvršiti standardnom
          uplatnicom u bilo kojoj pošti ili banci, ili putem Interneta ako imate
          web-banking.
        </p>
        <p className="mt-3 font-semibold">
          3. Platnim karticama putem web sajt
        </p>
        <p className="mt-1">
          Obradu plaćanja karticama vrši Banca Intesa A.D. Beograd i, ukoliko
          izaberete ovaj način plaćanja, bićete automatski preusmereni na sajt
          Banca Intesa ad Beograd. Na sajtu banke unosite broj svoje kartice i
          ostale potrebne podatke. Banka proverava vašu karticu i količinu
          sredstava na Vašem računu, i ako imate uslove za plaćanje, rezerviše
          sredstva na vašem računu u vrednosti iznosa porudžbine. U slučaju
          uspešne rezervacije automatski vam prosleđuje elektronsku poštu sa
          svim detaljima vaše narudžbenice i detaljima transakcije. Nakon
          završetka plaćanja, sa sajta Banca Intesa ad Beograd automatski se
          vraćate na sajt www.hobbrandgroup.rs i vaša kupovina je uspešno
          obavljena. Prenos podataka plaćanja od vašeg računara do sajta banke
          zaštićen je protokolom SSL. Sigurnost podataka prilikom plaćanja
          garantuje Banca Intesa ad Beograd. Podaci o platnoj kartici kupca ni u
          jednom trenutku nisu dostupni HOB BRAND GROUP DOO.
        </p>

        <h5 className="mt-4 text-[20px]">Napomena: Konverzija strane valute</h5>
        <p className="mt-2">
          Sva plaćanja biće izvršena u lokalnoj valuti Republike Srbije – dinar
          (RSD). Za informativni prikaz cena u drugim valutama koristi se
          srednji kurs Narodne Banke Srbije. Iznos za koji će biti zadužena Vaša
          platna kartica biće izražen u Vašoj lokalnoj valuti kroz konverziju u
          istu po kursu koji koriste kartičarske organizacije, a koji nama u
          trenutku transakcije ne može biti poznat. Kao rezultat ove konverzije
          postoji mogućnost neznatne razlike od originalne cene navedene na
          našem sajtu. Hvala Vam na razumevanju.
        </p>
        <h5 className="mt-4 text-[20px]">Način isporuke</h5>
        <p className="mt-2">
          Dostava robe koju ste poručili obavlja se putem kurirske službe u roku
          od 24 do 48 sati od momenta poručivanja.
        </p>
        <p className="mt-1">
          Sve narudžbe primljene radnim danom do 12:00 časova, dostavljaju se
          isti dan kurirskoj službi
        </p>
        <p className="mt-1">
          Pod radnim danom se podrazumevaju svi dani od ponedeljka do petka,
          osim u slučajevima kada je praznik.
        </p>

        <p className="mt-1">Subotom, nedeljom i praznicima roba se ne šalje.</p>
        <p className="mt-1">
          Kurirska služba isporučuje poručenu robu isključivo radnim danima.
        </p>
        <p className="mt-1">
          Ukoliko kurir vrši isporuku robe koja je oštećena u transportu, ili
          neće da sačeka da primalac otvori i pregleda paket, primalac ima puno
          pravo da paket ne preuzme. Nakon toga potrebno je da se odmah
          (najkasnije sutradan) obratite putem elektronske pošte
          info@hobbrandgroup.rs i izložite problem.
        </p>
        <p className="mt-1">
          U skladu sa članom 31. Zakona trgovac će bez odlaganja obavesti
          potrošača da isporuka ugovorene robe ili pružanje ugovorene usluge
          nije moguće.
        </p>
        <p className="mt-1">
          Kupac će biti kontaktiran korišćenjem kontakt podataka koji su
          navedeni prilikom registracije.
        </p>
        <p className="mt-1">
          Cena dostave zavisi od težine paketa i to obračunava kurirska služba.
          Procenjena vrednost isporuke vidi se na vašem računu prilikom
          poručivanja.
        </p>
        <p className="mt-1">
          Za sve porudžbe preko 5.000,00 dinara, troškovi dostave su besplatni
          osim u slučaju kada porudžbina obuhvata opremu. Tada troškove
          poštarine plaća kupac.
        </p>
        <p className="mt-1">
          Kurirska služba isporučuje robu do adrese, tj. ne unosi je u stambeni
          prostor.
        </p>
        <p className="mt-1">
          Rok za reklamacije na eventualna oštećenja je 24h od trenutka prijema
          robe.
        </p>
        <h5 className="mt-4 text-[20px]">Servis i reklamacije</h5>
        <p className="mt-2">
          HOB BRAND GROUP DOO kao ovlašćeni distributer kompanije Unitech d.o.o.
          Novi Sad garantuje za kvalitet svojih proizvoda. Svi proizvodi su
          originalne robne marke i odgovaraju specifikaciji navedenoj na sajtu i
          na pojedinačnom proizvodu. HOB BRAND GROUP DOO poštuje zakon o zaštiti
          potrošača i garantuje sledeće rokove:
        </p>
        <ul className="ml-4 mt-2">
          <li>
            · 14 dana - imate pravo da se predomislite ukoliko ste naručili robu
            preko Interneta
          </li>
          <li>
            · 30 dana - rok u kome je prodavac dužan da vam izvrši uslugu ili
            isporuku robe od dana zaključenja ugovora na daljinu i ugovora koji
            se zaključuje izvan poslovnih prostorija, osim ako nije nešto drugo
            ugovoreno
          </li>
        </ul>
        <p className="mt-1">
          Prodavac je dužan da bez odlaganja, a najkasnije u roku od osam dana
          od dana prijema reklamacije, pisanim ili elektronskim putem odgovori
          potrošaču na izjavljenu reklamaciju. Odgovor prodavca na reklamaciju
          potrošača mora da sadrži odluku da li prihvata reklamaciju,
          obrazloženje ako ne prihvata reklamaciju, izjašnjenje o zahtevu
          potrošača o načinu rešavanja i konkretan predlog u kom roku će i kako
          rešiti reklamaciju ukoliko je prihvata. Rok za rešavanje reklamacije
          ne može da bude duži od 15 dana, odnosno 30 dana za tehničku robu i
          nameštaj, od dana podnošenja reklamacije.
        </p>
        <p className="mt-1">
          Uputstvo o korišćenju proizvoda isporučuje se kupcu zajedno sa
          proizvodom.
        </p>
        <h5 className="mt-4 text-[20px]">Politika reklamacija</h5>
        <p className="mt-2">
          Potrošač može da izjavi reklamaciju usmeno na prodajnom mestu na
          adresi Sinđelićeva 25, lokal 8, Čačak, na broj telefona 032/365 934,
          pisanim putem na adresu Sinđelićeva 25, lokal 8, Čačak , elektronskim
          putem na e-mail info@hobbrandgroup.rs ili na trajnom nosaču zapisa, uz
          dostavu računa na uvid ili drugog dokaza o kupovini (kopija računa,
          slip i sl.).
        </p>
        <p className="mt-1">
          Odgovorno lice za prijem reklamacija je Sanja Simović. Reklamacije se
          primaju u toku radnog vremena svakog radnog dana od 09-16h.
        </p>
        <p className="mt-1">
          Za više informacija, pročitajte poseban odeljak{" "}
          <Link href="/reklamacije" className="text-red-600 underline">
            Reklamacije.
          </Link>
        </p>

        <h5 className="mt-4 text-[20px]">Zaštita privatnosti korisnika</h5>
        <p className="mt-2">
          U ime HOB-a obavezujemo se da ćemo čuvati privatnost svih naših
          kupaca. Prikupljamo samo neophodne, osnovne podatke o kupcima/
          korisnicima i podatke neophodne za poslovanje i informisanje korisnika
          u skladu sa dobrim poslovnim običajima i u cilju pružanja kvalitetne
          usluge. Dajemo kupcima mogućnost izbora uključujući mogućnost odluke
          da li žele ili ne da se izbrišu sa mailing lista koje se koriste za
          marketinške kampanje. Svi podaci o korisnicima/kupcima se strogo
          čuvaju i dostupni su samo zaposlenima kojima su ti podaci nužni za
          obavljanje posla. Svi zaposleni HOB-a odgovorni su za poštovanje
          načela zaštite privatnosti.
        </p>
        <h5 className="mt-4 text-[20px]">Povrat sredstava</h5>

        <p className="mt-2">
          Kontaktirajte nas pozivanjem na kontakt telefon{" "}
          {process.env.TELEPHONE} ili nam pošaljite email na adresu:{" "}
          {process.env.EMAIL} podatak Vašeg broja računa/otpremnice, Vaš JMBG
          (opciono), broj dinarskog tekućeg računa i naziv banke u kojoj imate
          navedeni račun. Kada dostavite potrebne podatke, biće kreirana
          dokumentacija koja će Vam sa procedurom za povraćaj sredstava biti
          prosleđena na email adresu koju ste ostavili prilikom kreiranja
          porudžbine.
        </p>
        <p className="mt-1">
          Povrat sredstava se vrši isključivo na gore navedeni način, uplatom na
          dinarski tekući račun i nije moguće slati novac po kuriru u gotovini.{" "}
        </p>
        <p>
          U slučaju vraćanja robe ili povrata sredstava kupcu koji je prethodno
          izvršio plaćanje nekom od platnih kartica, delimično ili u celosti, a
          bez obzira na razlog vraćanja, HOB je u obavezi da povrat izvrši
          isključivo putem VISA, EC/MC i Maestro metoda plaćanja. To znači da će
          banka na zahtev prodavca obaviti povrat sredstava na račun korisnika
          kartice. Poručeni artikal, bez prethodnog kontakta i dogovora sa
          operaterima u Online prodavnici, koji je gore naveden, ne možete slati
          na adrese koje su navedene na račun-otpremnici.Svaki takav paket biće
          vraćen pošiljaocu o trošku pošiljaoca.
        </p>
        <h5 className="mt-4 text-[20px]">Izjava o PDV-u</h5>
        <p className="mt-2">PDV uračunat u cenu i nema skrivenih troškova.</p>
      </div>
      <Footer />
    </>
  );
};

export default UsloviKoriscenja;
