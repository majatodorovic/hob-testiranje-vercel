import Footer from "@/components/Footer/Footer";
import Link from "next/link";

export const metadata = {
  title: "Politika privatnosti | HOB",
  description: "Dobrodošli na hobbrandgroup.com Online Shop",
  keywords: [
    "HOB",
    "online",
    "shop",
    "hobbrandgroup.com",
    "kozmetički preparati",
    "frizerski pribor",
    "gel lakovi",
    "pincete",
    "pet program",
    "barber",
  ],
};
const PolitikaPrivatnosti = () => {
  return (
    <>
      <div className="mt-[1.2rem] md:mt-[9rem] w-[95%] mx-auto md:w-[60%]">
        <h1 className="text-[40px] text-center pb-10 max-md:text-[1rem] text-[#191919] uppercase">
          Politika privatnosti{" "}
        </h1>

        <p className="text-[18px] mb-4">
          Poštovani korisnici ukoliko se interesujete za zaštitu podataka o
          ličnosti na našoj internet stranici, ovaj odeljak je pravo mesto za
          vas!
        </p>
        <p className="">
          Podaci o ličnosti su svi podaci koji se neposredno ili posredno odnose
          ili mogu da se odnose na vas kao fizičko lice. Kao zakonski osnov koji
          uređuje zaštitu podataka i uslove za obradu vaših podataka
          primenjujemo Zakon o zaštiti podataka o ličnosti ("Sl. glasnik RS",
          br. 87/2018), u daljem tekstu ,,Zakon"). U nastavku ćete pronaći sve
          informacije o prirodi i obimu obrade vaših ličnih podataka od strane
          HOB BRAND GROUP DOO, Sinđelićeva 25, lokal 8, Čačak, MB: 21451142, (u
          nastavku „HOB“ ili „mi“ ).
        </p>

        <ul className="mt-2 ml-4">
          <li>1. Na koji način prikupljamo ili dobijamo Vaše lične podatke?</li>
          <li>2. Koje podatke prikupljamo od Vas?</li>
          <ul className=" ml-4 mt-2">
            <li>a. Kupovina/porudžbina u HOB prodavnici/web sajtu</li>
            <li>b. Kreiranje korisničkog naloga na HOB sajtu</li>
            <li>
              c. Kontaktiranje sa HOB-om – razne vrste upita (kontakt e-mailom,
              telefonom, putem društvenih mreža)
            </li>
            <li>
              d. Marketinške svrhe – prijava za dobijanje obaveštenja o
              aktuelnoj ponudi i promocijama – Newsletter
            </li>
            <li>e. Promotivne radnje, nagradne igre, sponzorstva</li>
            <li>f. Profilisanje</li>
            <li>g. Poseta internet stranice</li>
            <li>h. Korišćenje kolačića (cookies)</li>
            <li>i. Google analitika</li>
            <li>j. Društvene mreže</li>
            <li>k. Video nadzor</li>
          </ul>
          <li>3. Ko ima pristup Vašim podacima?</li>
          <li>4. Koliko dugo čuvamo Vaše podatke?</li>
          <li>5. Da li ste u obavezi da nam dostavite Vaše podatke?</li>
          <li>6. Koja prava imate kao lice na koje se podaci odnose?</li>
          <li>7. Stupanje na snagu i izmene Politike prvatnosti</li>
        </ul>

        <h5 className="mt-4 mb-2 text-[18px]">
          <strong>
            1. Na koji način prikupljamo ili dobijamo Vaše lične podatke?
          </strong>
        </h5>
        <p>
          Prikupljamo Vaše lične podatke kada je to relevantno za potrebe Vas
          kao potrošača, ili za naše poslovanje (npr. kada kupujete i/ili
          naručujete proizvode i/ili usluge od nas, kada se registrujete za
          slanje newsletter-a, kada kontaktirate naš korisnički servis, kada
          popunjavate ankete za kupce ili nam date povratne informacije o našoj
          robi i uslugama, itd.).
        </p>
        <p className="mt-1">
          Informacije uglavnom dobijamo direktno od Vas, kada naručite određene
          proizvode ili usluge, popunite određeni formular, ili kada prikupimo
          podatke putem bezbednosnih kamera u maloprodajnim objektima.
        </p>
        <p className="mt-1">
          Dalje u tekstu ćemo Vam objasniti svrhe obrada podataka, i osnove u
          Zakonu Vaše lične podatke ćemo koristiti u marketinške svrhe, samo ako
          na to pristanete.
        </p>
        <p className="mt-1">
          Sve vaše lične informacije tretiraju se kao poverljive, a HOB i/ili
          naši pouzdani partneri ih čuvaju na adekvatan način (za više
          informacija pogledajte odeljak: Ko ima pristup Vašim podacima?).
        </p>
        <h5 className="mt-4 mb-2 text-[18px]">
          <strong>2. Koje podatke prikupljamo od Vas</strong>
        </h5>
        <p className="font-semibold">
          2.a. Kupovina/porudžbina u Unitech prodavnici/web sajtu
        </p>
        <p className="mt-1">
          HOB kao trgovac je po samom Zakonu o zaštiti potrošača ("Sl. glasnik
          RS", br. 62/2014, 6/2016 - dr. zakon i 44/2018 - dr. zakon) ovlašćen
          da prikuplja podatke o svojim kupcima. Vaši podaci su nam neophodni za
          zaključenje ugovora o prodaji na daljinu, kreiranje porudžbine, radi
          ispunjenja obaveza iz ugovora o prodaji – realizaciji isporuke,
          naplate, prijema i rešavanja reklamacija.
        </p>
        <p className="mt-1">
          U procesu kupovine online potrebno je da unesete svoje podatke u
          predviđena polja (ime, prezime, e-mail, broj telefona, adresu).
          Podatke prikupljene na ovaj način koristimo isključivo radi izvršenja
          ugovora o prodaji, što obuhvata upravljanje i praćenje porudžbina i
          komunikaciju sa Vama.
        </p>
        <p className="font-semibold mt-4">
          2.b. Kreiranje korisničkog naloga na HOB sajtu
        </p>
        <p className="mt-2">
          HOB prikuplja i obrađuje Vaše podatke prilikom kreiranja korisničkog
          naloga na HOB sajtu. Podaci koje prikupljamo su ime, prezime, e-mail,
          broj telefona, datum rođenja (ovaj podatak nije obavezan)
        </p>

        <p className="font-semibold mt-4">
          2.c. Kontaktiranje sa HOB – om, različite vrste upita (kontakt
          e-mailom, telefonom, putem društvenih mreža)
        </p>
        <p className="mt-2">
          U zavisnosti od načina na koji ste stupili u kontakt sa nama kao i
          vrste upita, ti podaci mogu obuhvatiti ime, prezime, broj telefona,
          adresu e-pošte, ostale informacije o vama koje ste razmenili sa nama,
          a koje su u vezi sa Vašim upitom.
        </p>
        <p className="mt-1">
          Podatke prikupljene na ovaj način možemo obrađivati u svrhe pružanja
          odgovora na Vaše upite, za potrebe prikupljanja statističkih podataka
          i profilisanje, kako bi unapredili naše poslovanje. Za potrebe
          statistike i profilisanja biće izvršena anonimizacija, tako da nijedan
          podatak ne može biti doveden u vezi sa konkretnim licem.
        </p>
        <p className="mt-1">
          Ukoliko niste saglasni da vam se obratimo putem e-maila o tome nas
          obavestite u pisanoj formi na e-mail adresu info@hobbrandgroup.rs
        </p>
        <p className="font-semibold mt-4">
          2.d. Marketinške svrhe - prijava za dobijanje obaveštenja o aktuelnoj
          ponudi i promocijama – Newsletter
        </p>
        <p className="mt-2">
          Na našem sajtu, kao i prilikom registracije, HOB će Vam ponuditi
          uslugu slanja obaveštenja o aktuelnim ponudama i promocijama na mail i
          tom prilikom treba da ostavite adresu e-pošte ako je u pitanju
          newsletter-a na mail.
        </p>
        <p className="mt-1">
          Ako ste pristali da primate naša obaveštenja, koristimo vašu e-mail,
          za slanje informacija o proizvodima, promocijama, nagradnim igrama,
          novostima i ponudama prodavnica. Ove podatke čuvamo i obrađujemo u
          svrhu slanja obaveštenja o aktuelnoj ponudi i promocijama.
        </p>
        <p className="mt-1">
          Uz Vašu saglasnost, beležimo Vaše ponašanje kao korisnika naše
          internet stranice www.hobbrandgroup.rs i newslettera. Ocena ponašanja
          korisnika podrazumeva pre svega podatke o odeljcima na kojima se
          zadržavate i na linkove, koje tamo koristite. Na taj način kreiramo
          personalizovane korisničke profile sa Vašim ličnim podacima i/ili sa
          podatkom o vašoj e-mail adresi kako bismo omogućili kreiranje reklamne
          ponude od strane Unitech u obliku newslettera, on-site reklame i
          štampanog materijala, prilagođene vašem ličnom interesovanju i time
          poboljšamo našu ponudu.
        </p>
        <p className="mt-1">
          Obaveštavamo vas da u slučaju da za slanje newslettera angažujemo
          eksterne partnere i iz tog razloga im dostavimo Vaše lične podatke to
          će biti učinjeno u skladu sa članom 45 Zakona o zaštiti podataka o
          ličnosti. Podaci će se čuvati dokle god ste Vi saglasni.
        </p>
        <p className="font-semibold mt-4">
          2.e. Promotivne radnje, nagradne igre, sponzorstva
        </p>
        <p className="mt-2">
          Za potrebe učestvovanja u nagradnim igrama, sponzorstva ili
          sprovođenja promotivnih radnji, prikupljamo podatke, u skladu sa
          pravilima za svaku aktivnost ponaosob. Napominjemo da nam je za
          prijavu učesnika uglavnom potrebno Vaše ime, prezime, a u zavisnosti
          od slučaja i datum rođenja, adresa, JMBG ako ste dobitnik nagrade čija
          vrednost prevazilazi iznos propisan poreskim propisima i ostale
          informacije koje ste nam dostavili.
        </p>
        <p className="mt-1">
          Pravni osnov je pristanak s obzirom da se prilikom prijave na konkurs,
          nagradnu igru i sl. saglašavate sa pravilima koje organizator propiše.
        </p>

        <p className="font-semibold mt-4">2.f. Profilisanje</p>
        <p className="mt-2">
          U slučajevima kada šaljemo ili prikazujemo obaveštenja ili sadržaj
          koji su personalizovanog karaktera, možemo koristiti pojedine postupke
          koji su označeni kao „profilisanje” (odnosno, bilo koji oblik
          automatizovanog procesa obrade ličnih podataka koji se sastoji iz
          korišćenja prikupljenih podataka o ličnosti kako bismo procenili
          određene lične aspekte koji su u vezi sa fizičkim licem, konkretno, da
          bismo analizirali ili predvideli aspekte koji se tiču ličnih afiniteta
          konkretnog fizičkog lica, njegovog interesovanja, ekonomskog položaja,
          ponašanja, lokacije, pouzdanosti ili kretanja).
        </p>
        <p className="mt-1">
          Na osnovu svoje analize, šaljemo ili prikazujemo obaveštenja i/ili
          sadržaj koji je skrojen tačno prema vašim interesovanjima/potrebama.
        </p>
        <p className="mt-1">
          Pravni osnov za gore pomenutu obradu podataka je pristanak.
        </p>
        <p className="font-semibold mt-4">2.g. Poseta internet stranice</p>
        <p className="mt-2">
          HOB obrađuje Vaše podatke prilikom posete ove internet stranice i
          drugih platformi. Tom prilikom se razmenjuju različiti podaci između
          Vašeg uređaja i našeg servera, pri čemu može da se radi o podacima o
          ličnosti. Podaci prikupljeni na taj način se, između ostalog, koriste
          za optimizaciju naše internet stranice ili u svrhu prikazivanja
          reklama u pretraživaču Vašeg uređaja.
        </p>
        <p className="mt-1">
          Prilikom posete naše internet stranice, pretraživač koji koristite na
          Vašem uređaju će automatski i bez Vaše aktivnosti poslati na server
          naše internet stranice:
        </p>
        <ul className="mt-2 ml-4">
          <li>
            · IP adresu uređaja sa kog je poslat upit i koji ima pristup
            internetu
          </li>
          <li>· datum i vreme pristupa,</li>
          <li>· ime i URL preuzete datoteke,</li>
          <li>
            · internet stranicu/aplikaciju sa koje se pristupa (referrer URL),
          </li>
          <li>
            · pretraživač koji koristite i, ako je potrebno, operativni sistem
            računara koji podržava internet, kao i ime vašeg provajdera.
          </li>
        </ul>
        <p className="mt-1">
          Navedene podatke server privremeno čuva u takozvanoj log datoteci u
          sledeće svrhe:
        </p>
        <ul className="mt-2 ml-4">
          <li>· obezbeđivanje uspostavljanja nesmetane veze,</li>
          <li>
            · obezbeđivanje komfornog korišćenja naše internet
            stranice/aplikacije,
          </li>
          <li>· procena bezbednosti i stabilnosti sistema.</li>
        </ul>

        <p className="mt-1">
          Ukoliko ste u Vašem pretraživaču, u operativnom sistemu ili u drugim
          podešavanjima Vašeg uređaja prihvatili tzv. geolokaciju, odnosno dali
          svoj pristanak, ovu funkciju koristimo kako bismo vam ponudili
          individualne usluge na osnovu Vaše trenutne lokacije (na primer,
          lokaciju najbliže prodavnice). Podatke o lokaciji obrađujemo
          isključivo u navedenu svrhu.
        </p>
        <p className="mt-1">
          Pravni osnov za obradu IP adrese je legitimni interes, koji proizlazi
          iz gore navede svrhe obrade podataka, budući da je to tehnički uslov
          za funcionisanje sajta. Ove podatke ne prenosimo trećim licima. Podaci
          se čuvaju privremeno i to za vreme posete stranici, a zatim se
          automatski brišu. Nakon što napustite našu internet stranicu, podaci o
          geolokaciji se brišu.
        </p>

        <p className="font-semibold mt-4">2.h. Korišćenje kolačića (cookies)</p>
        <p className="mt-2">
          Na našoj internet stranici koristimo takozvane kolačiće. Kolačići su
          male datoteke koje se čuvaju na Vašem uređaju (laptop, tablet,
          smartphone itd.) i to prilikom posete naše internet stranice. Kolačići
          ne nanose štetu vašem uređaju, ne sadrže viruse, trojance ili druge
          zlonamerne softvere. U kolačićima se čuvaju informacije koje se
          dobijaju u vezi sa uređajem koji koristite. Međutim, to ne znači da
          smo upoznati sa Vašim identitetom.
        </p>
        <p className="mt-1">
          S jedne strane, korišćenje kolačića služi da vam poseta internet
          stranici bude prijatnija. Na primer, mi koristimo takozvane kolačiće
          sesije kako bismo prepoznali da ste određene delove naše stranice već
          posetili ili da ste već prijavljeni na svom korisničkom nalogu. Oni se
          automatski brišu nakon što napustite našu internet stranicu. Pored
          toga, koristimo i privremene kolačiće koji se određeno vreme skladište
          na vašem uređaju. Kada ponovo posetite našu internet stranicu,
          automatski se prepoznaje da ste već bili na stranici i koja
          podešavanja ste postavili, tako da ove radnje nećete morati da
          ponovite.
        </p>
        <p className="mt-1">
          S druge strane, kolačiće koristimo kako bismo statistički evidentirali
          korišćenje naše internet stranice, i to u cilju optimizacije ponude i
          prikaza informacija koje su prilagođene Vašim interesovanjima. Ovi
          kolačići nam omogućavaju da Vas automatski prepoznamo kada ponovo
          posetite našu internet stranicu. Ovi kolačići se automatski brišu
          nakon 5 godina.
        </p>
        <p className="mt-1">
          Većina pretraživača automatski prihvata kolačiće. Međutim, možete da
          podesite Vaš pretraživač tako da se na Vašem računaru ne čuvaju
          kolačići ili da se uvek pojavljuje poruka pre nego što se kreira novi
          kolačić. Ipak, potpuno onemogućavanje kolačića može da znači da ne
          možete da koristite sve funkcije naše internet stranice.
        </p>
        <p className="font-semibold mt-4">2.i. Google analitika</p>
        <p className="mt-2">
          Za potrebe prilagođavanja dizajna i stalnog poboljšavanja naših
          internet stranica, koristimo takozvani Google Analytics - uslugu za
          veb analitiku koju pruža Google Inc. ("Google"). U tom kontekstu se
          kreiraju pseudonimizovani korisnički profili i koriste se kolačići.
          Kolačići generišu sledeće informacije o vašem korišćenju ove internet
          stranice:
        </p>
        <ul className="mt-2 ml-4">
          <li>· tip/verzija pretraživača,</li>
          <li>· operativni sistem koji se koristi,</li>
          <li>· referrer URL (prethodno posećena stranica),</li>
          <li>· hostname računara sa kog se pristupa (IP adresa),</li>
          <li>· vreme upita servera</li>
        </ul>
        <p className="mt-1">
          Podaci se koriste za evaluaciju korišćenja naše internet stranice, za
          sastavljanje izveštaja o aktivnostima na stranici i za pružanje drugih
          usluga vezanih za korišćenje stranica i korišćenje interneta. Podaci
          se obrađuju u svrhu istraživanja tržišta i prilagođavanja ovih
          internet stranica. IP adrese su anonimizovane, tako da nije moguće
          utvrditi identitet (takozvani IP maskiranje). Ni pod kojim uslovima
          Vaša IP adresa neće biti povezana sa drugim podacima Google-a Više
          informacija o zaštiti podataka u vezi sa Google Analytics potražite na
          internet stranici Google Analytics.
        </p>
        <p className="font-semibold mt-4">2.j. Društvene mreže</p>
        <p className="mt-2">
          Podatke na društvenim mrežama velikim delom obrađuje sam operater, i
          na taj deo Unitech ima ograničen uticaj.
        </p>
        <p className="mt-1">
          Detaljnije informacije o obradi podataka od strane operatera platforma
          društvenih mreža i o mogućnostima prigovora možete pronaći u njihovim
          pravilima o zaštiti podataka:
        </p>
        <ul className="mt-2 ml-4">
        
          <li>
            ·{" "}
            <Link
              href="https://policies.google.com/privacy?hl=sr&gl=rs"
              target="_blank"
            >
              Youtube
            </Link>
          </li>
          <li>
            ·{" "}
            <Link
              href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirecthttps://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0"
              target="_blank"
            >
              Instagram
            </Link>
          </li>
        </ul>
        <p className="mt-2">
          Podatke prikupljene na društvenim mrežama obrađujemo u svrhu
          informisanja potrošača o aktuelnim promocijama i ponudama, a u cilju
          interakcije i unapređenja odnosa sa pratiocima.
        </p>
        <p className="mt-1">
          Podatke prikupljene na društvenim mrežama na osnovu pristanka-
          komentare, video snimke, slike, lajkove…objavljuje operater. Unitech
          ih ne deli sa trećim licima i zadržava pravo brisanja nezakonitih
          sadržaja, komentara mržnje, eksplicitni sadržaj i podatke koji
          predstavljaju krivično delo.
        </p>
        <p className="mt-1">
          Sa operaterom društvene mreže delom postoji odnos u skladu sa čl. 45
          Zakona (zajednička odgovornost):
        </p>
        <p className="mt-1">
          Za metode web praćenja koje operater platforme društvene mreže
          omogućava, operater i mi smo zajednički odgovorni. Web praćenje
          (webtracking) može pritom da usledi i nezavisno od toga da li ste na
          platformu društvene mreže prijavljeni ili registrovani. Kao što smo
          već napomenuli, nažalost samo ograničeno možemo da utičemo na metode
          web praćenja operatera, na primer ne možemo da ih isključimo.
        </p>
        <p className="mt-1">
          Pravni osnov za metode web praćenja je legitiman interes, koji se
          sastoji u tome da se platforma društvene mreže i konkretna fan
          stranica (fan-page) optimizuju.
        </p>
        <p className="font-semibold mt-4">2.k. Video nadzor</p>
        <p className="mt-2">
          HOB koristi video nadzor za potrebe bezbednosti zaposlenih i imovine,
          i radi otkrivanja krivičnih dela i drugih spornih situacija.
          Obaveštenje o video nadzoru se nalazi na ulazu u naš maloprodajni
          objekat. Čuvamo informacije prikupljene putem u vremenskom periodu
          koji nam omogućava da pomognemo regulatornim telima i organima za
          sprovođenje zakona. Pristup podacima imaju samo ovlašćena lica u
          HOB-u.
        </p>
        <p className="font-semibold mt-4">3. Ko ima pristup Vašim podacima?</p>
        <p className="mt-1">
          Unutar naše kompanije, pristup podacima, koje ste nam stavili na
          raspolaganje, imaju samo oni sektori kojima su isti neophodni za
          ispunjenje ugovornih ili zakonskih obaveza ili u svrhu ispunjenja
          legitimnih interesa. U okviru ugovornog odnosa, angažujemo i druge
          pružaoce usluga, koji mogu da dobiju pristup vašim ličnim podacima.
          Pridržavanje propisa o zaštiti podataka o ličnosti se u ovim
          slučajevima obezbeđuje ugovorom.
        </p>
        <p className="font-semibold mt-4">
          4. Koliko dugo čuvamo Vaše podatke?
        </p>
        <p className="mt-1">
          Lične podatke čuvamo onoliko koliko je to neophodno za ispunjenje gore
          navedenih svrha. Pri tome, vodimo računa o zakonskim obavezama
          čuvanja. Kriterijume za period čuvanja podataka kreiramo u skladu sa
          svrhom, ali budući da se tehnička roba i oprema za frizerske i
          kozmetičke salone ne kupuje svakodnevno, smatramo da je period od 5
          godina optimalan za postizanje marketinške svrhe, dok se podaci o
          realizovanim kupovinama I kupcima čuvaju koliko je to predviđeno
          poreskim propisima I propisima koji regulišu ugovor o prodaji.
        </p>
        <p className="font-semibold mt-4">
          5. Da li ste u obavezi da nam dostavite Vaše podatke?
        </p>
        <p className="mt-2">
          U okviru našeg poslovnog odnosa u obavezi ste da nam dostavite one
          lične podatke, koji su neophodni za započinjanje, sprovođenje i
          okončavanje ugovornog odnosa i za ispunjenje obaveza koje su povezane
          sa tim, kao i za čije prikupljanje imamo zakonsku obavezu ili imamo
          pravo na osnovu legitimnih interesa. Bez tih podataka, po pravilu
          nećemo biti u mogućnosti da započnemo poslovni odnos sa vama.
        </p>
        <p className="font-semibold mt-4">
          6. Koja prava imate kao lice na koje se podaci odnose?
        </p>
        <ul className="mt-2 ml-4">
          <li>
            · da Vam omogucimo pristup Vašim ličnim podacima, da odgovorimo za
            koje svrhe se koriste podaci koji se tiču Vas, kao i da pristupite
            takvim ličnim podacima, da znate svrhu obrade, kategorije Vaših
            ličnih podataka koje čuvamo, treće, strane ili kategorije trećih
            strana sa kojima se vaši lični podaci dele, period tokom kog
            zadržavamo podatke.
          </li>
          <li>
            · da zahtevate ispravku netačnih, pogrešno unetih i/ili zastarelih
            podataka;
          </li>
          <li>
            · da zatražite brisanje Vaših ličnih podataka ukoliko se obrada
            zasniva na Vašem pristanku. Pristanak možete opozvati u svakom
            trenutku, tako što ćete se odjaviti na način koji smo predvideli
            (slanjem poruke na određeni broj ili preko određenog linka) kao i
            slanjem email poruke na mail adresu Unitech: info@hobbrandgroup.rs.
            Ukoliko je osnov zakon ili legitimni interes, ne možemo udovoljiti
            Vašem zahtevu za brisanjem podataka;
          </li>
          <li>
            · da ograničite obradu Vaših podataka ukoliko smatrate da je obrada
            nezakonita, ako ste istakli prigovor ili ako smatrate da HOB-u više
            nisu potrebni Vaši podaci;
          </li>
          <li>
            · da podnesete prigovor na način na koji obrađujemo Vaše podatke,
            čak i u slučajevima kada nije sporno da podatke obrađujemo u skladu
            sa Zakonom;
          </li>
          <li>
            · da uputite pritužbu Povereniku za zaštitu podataka o ličnosti, u
            skladu sa Zakonom.
          </li>
        </ul>
        <p className="mt-2">
          Za sva pitanja i zahteve u vezi sa obradom podataka o ličnosti možete
          da kontaktirate naše Lice za zaštitu podataka o ličnosti. Kontakt
          email: info@hobbrandgroup.rs.
        </p>
        <p className="font-semibold mt-4">
          Stupanje na snagu i izmene Politike privatnosti
        </p>
        <p className="mt-2">
          Ova Politika stupa na snagu dana 21.05.2024. godine.
        </p>
        <p className="mt-1">
          Politika privatnosti će biti predmet redovnih revizija, a svaku
          ažuriranu verziju ćemo postaviti na ovu internet stranicu.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PolitikaPrivatnosti;
