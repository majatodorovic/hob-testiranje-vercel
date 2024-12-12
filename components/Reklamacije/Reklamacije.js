"use client";

import Link from "next/link";
import Footer from "@/components/Footer/Footer";

const Reklamacije = () => {
  return (
    <>
      <div className="mx-auto mt-[1.2rem] max-md:w-[95%] md:mt-[9rem] md:w-[60%]">
        <h1 className="pb-10 text-center text-[40px] uppercase text-[#191919] max-md:text-[1rem]">
          Reklamacije
        </h1>

        <p className="mt-2">
          Sve reklamacije nastale u slučaju nesaobraznosti kupljene robe
          regulisane su Zakonom o zaštiti potrošača (Sl.glasnik RS”, br.
          88/2021). Potrošač je fizičko lice koje na tržištu pribavlja robu ili
          usluge u svrhe koje nisu namenjene njegovoj poslovnoj ili drugoj
          komercijalnoj delatnosti (Član 5. Stav 1). HOB BRAND GROUP DOO
          sklapanjem ugovora sa potrošačem prihvata sve obaveze iz tog zakona uz
          svu profesionalnu pažnju usmerenu ka potrošaču.
        </p>
        <p className="mt-1">
          Na osnovu člana 49. Zakona prodavac je dužan da isporuči robu koja je
          saobrazna ugovoru
        </p>

        <p className="mt-1">
          Pretpostavlja se da je isporučena roba saobrazna ugovoru:
        </p>
        <ul className="ml-4 mt-2">
          <li>
            1. ako odgovara opisu koji je dao prodavac i ako ima svojstva robe
            koju je prodavac pokazao potrošaču kao uzorak ili model;
          </li>
          <li>
            2. ako ima svojstva potrebna za naročitu upotrebu za koju je
            potrošač nabavlja, a koja je bila poznata prodavcu ili mu je morala
            biti poznata u vreme zaključenja ugovora;
          </li>
          <li>
            3. ako ima svojstva potrebna za redovnu upotrebu robe iste vrste;
          </li>
          <li>
            4. ako po kvalitetu i funkcionisanju odgovara onome što je
            uobičajeno kod robe iste vrste i što potrošač može osnovano da
            očekuje s obzirom na prirodu robe i javna obećanja o posebnim
            svojstvima robe data od strane prodavca, proizvođača ili njihovih
            predstavnika, naročito ako je obećanje učinjeno putem oglasa ili na
            ambalaži robe.
          </li>
        </ul>

        <p className="mt-1">
          Član 50. Zakona propisuje da prodavac odgovara za nesaobraznosti
          isporučene robe ugovoru ako:
        </p>
        <ul className="ml-4 mt-2">
          <li>
            1. je postojala u času prelaska rizika na potrošača, bez obzira na
            to da li je za tu nesaobraznost prodavac znao;
          </li>
          <li>
            2. se pojavila posle prelaska rizika na potrošača i potiče od uzroka
            koji je postojao pre prelaska rizika na potrošača;
          </li>
          <li>
            3. je potrošač mogao lako uočiti, ukoliko je prodavac izjavio da je
            roba saobrazna ugovoru.
          </li>
        </ul>
        <p className="mt-1">
          Prodavac je odgovoran i za nesaobraznost nastalu zbog nepravilnog
          pakovanja, nepravilne instalacije ili montaže koju je izvršio on ili
          lice pod njegovim nadzorom, kao i za nepravilnu instalaciju ili
          montažu robe koja je posledica nedostatka u uputstvu koje je predao
          potrošaču radi samostalne instalacije ili montaže.
        </p>
        <p className="mt-1">
          Prodavac ne odgovara za nesaobraznost ako je u trenutku zaključenja
          ugovora potrošaču bilo poznato ili mu nije moglo ostati nepoznato da
          roba nije saobrazna ugovoru ili ako je uzrok nesaobraznosti u
          materijalu koji je dao potrošač.
        </p>
        <p className="mt-1">
          Odgovornost prodavca za nesaobraznost robe ugovoru ne sme biti
          ograničena ili isključena suprotno odredbama ovog zakona.
        </p>
        <p className="mt-1">
          Prodavac nije vezan javnim obećanjem u pogledu svojstava robe ako:
        </p>
        <ul className="ml-4 mt-2">
          <li>1. nije znao ili nije mogao znati za dato obećanje;</li>
          <li>2. je pre zaključenja ugovora objavljena ispravka obećanja;</li>
          <li>
            3. obećanje nije moglo uticati na odluku potrošača da zaključi
            ugovor.
          </li>
        </ul>
        <p className="mt-2">
          Član 51. Zakona propisuje da ako isporučena roba nije saobrazna
          ugovoru, potrošač koji je obavestio prodavca o nesaobraznosti ima
          pravo da zahteva od prodavca da otkloni nesaobraznost, bez naknade,
          opravkom ili zamenom ili da zahteva odgovarajuće umanjenje cene ili da
          raskine ugovor u pogledu te robe.
        </p>
        <p className="mt-1">
          Potrošač ima pravo da bira između opravke ili zamene kao načina
          otklanjanja nesaobraznosti robe.
        </p>
        <p className="mt-1">
          Ako otklanjanje nesaobraznosti u skladu sa stavom 2. ovog člana nije
          moguće, potrošač ima pravo da zahteva odgovarajuće umanjenje cene ili
          raskid ugovora ako:
        </p>
        <ul className="ml-4 mt-2">
          <li>
            1. nesaobraznost ne može da se otkloni opravkom ili zamenom uopšte,
            ni u primerenom roku;
          </li>
          <li>
            2. ne može da ostvari pravo na opravku ili zamenu, to jest ako
            prodavac nije izvršio opravku ili zamenu u primerenom roku;
          </li>
          <li>
            3. opravka ili zamena ne može da se sprovede bez značajnijih
            nepogodnosti za potrošača zbog prirode robe i njene namene;
          </li>
          <li>
            4. otklanjanje nesaobraznosti opravkom ili zamenom predstavlja
            nesrazmerno opterećenje za prodavca.
          </li>
        </ul>
        <p className="mt-2">
          Nesrazmerno opterećenje za prodavca u smislu stava 3. tačka 4) ovog
          člana, javlja se ako u poređenju sa umanjenjem cene i raskidom
          ugovora, stvara preterane troškove, uzimajući u obzir:
        </p>
        <ul className="ml-4 mt-2">
          <li>1. vrednost robe koju bi imala da je saobrazna ugovoru;</li>
          <li>2. značaj saobraznosti u konkretnom slučaju;</li>
          <li>
            3. da li se nesaobraznost može otkloniti bez značajnijih
            nepogodnosti za potrošača.
          </li>
        </ul>
        <p className="mt-2">
          Potrošač ima pravo da zahteva zamenu, odgovarajuće umanjenje cene ili
          da raskine ugovor zbog istog ili drugog nedostatka saobraznosti koji
          se posle prve opravke pojavi, a ponovna opravka je moguća samo uz
          izričitu saglasnost potrošača.
        </p>
        <p className="mt-1">
          Uzimajući u obzir prirodu robe i svrhu zbog koje je potrošač nabavio,
          opravka ili zamena mora se izvršiti u primerenom roku bez značajnih
          neugodnosti za potrošača i uz njegovu saglasnost
        </p>
        <p className="mt-1">
          Ako se nesaobraznost pojavi u roku od šest meseci od dana prelaska
          rizika na potrošača, potrošač ima pravo da bira između zahteva da se
          nesaobraznost otkloni zamenom, odgovarajućim umanjenjem cene ili da
          izjavi da raskida ugovor.
        </p>
        <p className="mt-1">
          Sve troškove koji su neophodni da bi roba postala saobrazna ugovoru, a
          naročito troškove rada, materijala, preuzimanja i isporuke, snosi
          prodavac.
        </p>
        <p className="mt-1">
          Za obaveze prodavca prema potrošaču, koje nastanu usled nesaobraznosti
          robe, prodavac ima pravo da zahteva od proizvođača u lancu nabavke te
          robe, da mu naknadi ono što je ispunio po osnovu te obaveze.
        </p>
        <p className="mt-1">
          Potrošač ne može da raskine ugovor ako je nesaobraznost robe neznatna.
        </p>
        <p className="mt-1">
          Prava iz stava 1. ovog člana ne utiču na pravo potrošača da zahteva od
          prodavca naknadu štete koja potiče od nesaobraznosti robe, u skladu sa
          opštim pravilima o odgovornosti za štetu.
        </p>
        <p className="mt-1">
          Na osnovu člana 53. Zakona garancija je svaka izjava kojom njen
          davalac daje obećanje u vezi sa robom, i pravno je obavezujuća pod
          uslovima datim u izjavi, kao i oglašavanju u vezi sa tom robom.
        </p>
        <p className="mt-1">
          Garantni list je isprava u pisanom ili elektronskom obliku ili na
          drugom trajnom nosaču zapisa, koja sadrži sve podatke iz garancije,
          navedene na jasan i čitljiv način, lako razumljivim jezikom, a
          naročito podatke o:
        </p>

        <ul className="ml-4 mt-2">
          <li>
            1. pravima koja potrošač ima na osnovu ovog zakona i o tome da
            garancija ne isključuje i ne utiče na prava potrošača koja proizlaze
            iz zakonske odgovornosti prodavca za nesaobraznost robe ugovoru;
          </li>
          <li>2. nazivu i adresi davaoca garancije;</li>
          <li>
            3. nazivu i adresi prodavca, ako on nije istovremeno i davalac
            garancije;
          </li>
          <li>4. datumu predaje robe potrošaču;</li>
          <li>
            5. podatke kojima se identifikuje roba (model, tip, serijski broj i
            sl.);
          </li>
          <li>
            6. sadržini garancije, uslovima i postupku ostvarivanja prava iz
            garancije;
          </li>
          <li>7. trajanju garantnog roka i prostornom važenju garancije.</li>
        </ul>
        <p className="mt-2">
          Trgovac je dužan da za datu garanciju sačini garantni list iz stava 2.
          ovog člana, po pravilu u pisanom obliku, na papiru.
        </p>
        <p className="mt-1">
          Trgovac je dužan da potrošaču preda garantni list iz stava 2. ovog
          člana ukoliko se roba prodaje sa garancijom.
        </p>
        <p className="mt-1">
          Garantni list se može izdati i u elektronskom obliku ili na drugom
          trajnom nosaču zapisa koji je dostupan potrošaču, ukoliko se potrošač
          saglasi.
        </p>
        <p className="mt-1">
          Teret dokazivanja da je garantni list predat potrošaču je na trgovcu.
        </p>
        <p className="mt-1">
          Na punovažnost garancije ne utiče povreda obaveze davaoca garancije iz
          stava 2. ovog člana, i potrošač može da zahteva da se garancija ispuni
          u skladu sa datom izjavom.
        </p>
        <p className="mt-1">
          Garancija ne isključuje i ne utiče na prava potrošača u vezi sa
          saobraznošću robe ugovoru.
        </p>
        <p className="mt-1">
          Članom 55. Zakona propisano je da potrošač može da izjavi reklamaciju
          prodavcu radi ostvarivanja svojih prava iz člana 51. i člana 80. ovog
          zakona, kao i zbog pogrešno obračunate cene i drugih nedostataka.
        </p>
        <p className="mt-1">
          Potrošač može da izjavi reklamaciju prodavcu radi ostvarivanja svojih
          prava iz člana 53. ovog zakona u roku u kome je predviđena odgovornost
          prodavca po osnovu nesaobraznosti, a posle isteka tog roka reklamacija
          se izjavljuje izdavaocu garancije.
        </p>
        <p className="mt-1">
          Trgovac je dužan da primi izjavljenu reklamaciju.
        </p>
        <p className="mt-1">
          Prodavac je dužan da na prodajnom mestu vidno istakne obaveštenje o
          načinu i mestu prijema reklamacija, kao i da obezbedi prisustvo lica
          ovlašćenog za prijem reklamacija u toku radnog vremena.
        </p>
        <p className="mt-1">
          Potrošač može da izjavi reklamaciju usmeno na prodajnom mestu na
          adresi Sinđelićeva 25, lokal 8, Čačak, na broj telefona 032/365 934,
          pisanim putem na adresu Sinđelićeva 25, lokal 8, Čačak , elektronskim
          putem na e-mail info@hobbrandgroup.rs ili na trajnom nosaču zapisa, uz
          dostavu računa na uvid ili drugog dokaza o kupovini (kopija računa,
          slip i sl.).
        </p>
        <p className="mt-1">
          Odgovorno lice za prijem reklamacija je Sanja Simović. Reklamacije se
          primaju u toku radnog vremena svakog radnog dana od 08-16h.
        </p>
        <p className="mt-1">
          Prodavac je dužan da vodi evidenciju primljenih reklamacija i da je
          čuva najmanje dve godine od dana podnošenja reklamacija potrošača.
          Prilikom obrade podataka o ličnosti potrošača, prodavac postupa u
          skladu sa propisima kojima se uređuje zaštita podataka o ličnosti.
        </p>
        <p className="mt-1">
          Prodavac je dužan da potrošaču bez odlaganja izda pisanu potvrdu ili
          elektronskim putem potvrdi prijem reklamacije, odnosno saopšti broj
          pod kojim je zavedena njegova reklamacija u evidenciji primljenih
          reklamacija.
        </p>
        <p className="mt-1">
          Evidencija o primljenim reklamacijama vodi se u obliku ukoričene
          knjige ili u elektronskom obliku i sadrži naročito ime i prezime
          podnosioca i datum prijema reklamacije, podatke o robi, kratkom opisu
          nesaobraznosti i zahtevu iz reklamacije, datumu izdavanja potvrde o
          prijemu reklamacije, odluci o odgovoru potrošaču, datumu dostavljanja
          te odluke, ugovorenom primerenom roku za rešavanje na koji se saglasio
          potrošač, načinu i datumu rešavanja reklamacije, kao i informacije o
          produžavanju roka za rešavanje reklamacije.
        </p>
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
          Prodavac je dužan da postupi u skladu sa odlukom i predlogom za
          rešavanje reklamacije, ukoliko je dobio prethodnu saglasnost
          potrošača. Rok za rešavanje reklamacije prekida se kada potrošač primi
          odgovor prodavca iz stava 9. ovog člana i počinje da teče iznova kada
          prodavac primi izjašnjenje potrošača.
        </p>
        <p className="mt-1">
          Potrošač je dužan da se izjasni na odgovor prodavca najkasnije u roku
          od tri dana od dana prijema odgovora prodavca. Ukoliko se potrošač u
          propisanom roku ne izjasni, smatraće se da nije saglasan sa predlogom
          prodavca iz stava 9. ovog člana.
        </p>
        <p className="mt-1">
          Ukoliko prodavac iz objektivnih razloga nije u mogućnosti da udovolji
          zahtevu potrošača u propisanom roku, dužan je da o produžavanju roka
          za rešavanje reklamacije obavesti potrošača i navede rok u kome će je
          rešiti, kao i da dobije njegovu saglasnost, što je u obavezi da
          evidentira u evidenciji primljenih reklamacija. Produžavanje roka za
          rešavanje reklamacija moguće je samo jednom.
        </p>
        <p className="mt-1">
          Ukoliko prodavac odbije reklamaciju, dužan je da potrošača obavesti o
          mogućnosti rešavanja spora vansudskim putem i o nadležnim telima za
          vansudsko rešavanje potrošačkih sporova.
        </p>
        <p className="mt-1">
          Nemogućnost potrošača da dostavi prodavcu ambalažu robe ne može biti
          uslov za rešavanje reklamacije, ni razlog za odbijanje otklanjanja
          nesaobraznosti.
        </p>
        <p className="mt-1">
          Ukoliko prodavac usmeno izjavljenu reklamaciju reši u skladu sa
          zahtevom potrošača prilikom njenog izjavljivanja, nije dužan da
          postupi na način predviđen stavom 7. i stavom 9. ovog člana.
        </p>
        <p className="mt-1">
          Potrošač i trgovac mogu rešiti vansudskim putem potrošačke sporove.
        </p>
        <p className="mt-1">
          Ministar unutrašnje i spoljne trgovine bliže uređuje uslove za
          osnivanje i rad tela, obrazac predloga za pokretanje postupka
          vansudskog rešavanja spora (u daljem tekstu: predlog)- ovaj obrazac
          potrošač ima na sajtu Ministarstva unutrašnje i spoljne trgovine.
          Vansudsko rešavanje potrošačkih sporova u smislu Zakona o zaštiti
          potrošača obavlja se na transparentan, efikasan, brz i pravičan način
          pred telom za vansudsko rešavanje potrošačkih sporova (u daljem
          tekstu: telo).
        </p>
        <p className="mt-1">
          Ministarstvo unutrašnje i spoljne trgovine sačinjava listu tela i
          javno je objavljuje.
        </p>
        <p className="mt-1">
          Postupak pred telom može da pokrene potrošač samo ukoliko je prethodno
          izjavio reklamaciju ili prigovor trgovcu.
        </p>
        <p className="mt-1">
          Trgovac je obavezan da učestvuje u postupku vansudskog rešavanja
          potrošačkih sporova pred telom.
        </p>
        <p className="mt-1">
          Vansudsko rešavanje potrošačkog spora u skladu sa ovim zakonom može da
          traje najduže 90 dana od dana podnošenja predloga.
        </p>
        <p className="mt-1">
          Izuzetno, u opravdanim slučajevima kada je predmet spora složen, rok
          od 90 dana se može produžiti za najviše još 90 dana, o čemu telo bez
          odlaganja obaveštava potrošača i trgovca.
        </p>
        <p className="mt-1">
          Potrošač može odustati od daljeg učešća u vansudskom rešavanju
          potrošačkog spora do okončanja postupka.
        </p>
        <p className="mt-1">
          U slučaju potrebe za reklamacijom u vezi sa saobraznosti kupljene robe
          možete robu doneti ili poslati kurirskom službom o trošku trgovca na
          adresu HOB BRAND GROUP DOO, SINĐELIĆEVA 25, LOK 8, ČAČAK.
        </p>
        <p className="mt-1">Kurirske službe sa kojima saradjujemo su:</p>
        <ul className="ml-4 mt-2">
          <li>• D express</li>
          <li>Zage Malivuk 1, 11060 Beograd</li>
          <li>011/331-33-33</li>
        </ul>
        <p className="mt-2">
          U slučaju da kupac ne podleže zakonu o potrošačima, rešavanje problema
          u slučaju nesaobraznosti robe HOB postupa po internom pravilniku br.
          1/2019.
        </p>
        <p className="mt-2">
          PRAVILNIK O GARANTNOM ROKU TRGOVAČKE ROBE{" "}
          <Link
            href="/doc/pravilnik_garantni_rok.pdf"
            target="_blank"
            className="text-red-600 underline"
          >
            Preuzmite pravilnik br.1/2019
          </Link>
        </p>

        <p className="mt-1">
          Da bi se izbegli nesporazumi, prilikom isporuke dužnost kupca je da
          izvrši pregled proizvoda i da ukaže na eventualna mehanička oštećenja
          (pročitati način isporuke).
        </p>
        <p className="mt-1">
          Kupcu koji je prethodno platio nekom od platnih kartica, delimično ili
          u celosti, a bez obzira na razlog vraćanja, HOB BRAND GROUP DOO je u
          obavezi da povraćaj izvrši isključivo preko VISA, EC/MC i Maestro
          metoda plaćanja, što znači da će banka na zahtev prodavca obaviti
          povraćaj sredstava na račun korisnika kartice.
        </p>

        <p className="mt-4 font-[20px]">Servis</p>
        <p className="mt-2">
          HOB BRAND GROUP DOO koristi usluge u okviru privrednog društva
          "Unitech DOO" na adresi Mileve Simić 23, Novi Sad, gde Vam je dostupna
          usluga servisa, rezervnih delova, potrošnog materijala za priključne
          aparate, tehničkog servisa, održavanja i popravke za vreme i posle
          prestanka perioda u kojem odgovara za nesaobraznost u ugovoru, odnosno
          posle prestanka proizvodnje ili uvoza robe.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Reklamacije;
