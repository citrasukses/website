import type { LocalizedText } from "@/lib/i18n";
import type { NacProductFamilyDetail, NacFamilyOption, NacSelectionItem } from "@/data/nac-product-details";

export type NacCouplingProductFamilyDetail = NacProductFamilyDetail & {
  kind: "coupling";
};

const l = (id: string, en: string): LocalizedText => ({ id, en });

const option = (
  key: string,
  optionName: LocalizedText,
  series: string,
  valve: string,
  connectionAndSize: string,
  materialAndPressure: string,
  application: LocalizedText
): NacFamilyOption => ({
  key,
  option: optionName,
  series,
  toolInterface: valve,
  workingEnd: connectionAndSize,
  lengths: materialAndPressure,
  application
});

const checklist = (
  fluid: LocalizedText,
  pressure: LocalizedText,
  connection: LocalizedText,
  material: LocalizedText
): NacSelectionItem[] => [
  { label: l("Fluida & temperatur", "Fluid & temperature"), value: fluid },
  { label: l("Tekanan kerja", "Working pressure"), value: pressure },
  { label: l("Ukuran & koneksi", "Size & connection"), value: connection },
  { label: l("Body & seal", "Body & seal"), value: material }
];

const image = (slug: string) => [`/assets/brands/products/nac/couplings/catalog-coupling-${slug}.png`];

export const nacCouplingProductDetails: Record<string, NacCouplingProductFamilyDetail> = {
  "cal-type-20": {
    kind: "coupling",
    overview: l(
      "CAL Type 20 adalah seri quick coupling low-pressure single-valve NAC yang paling luas dipakai untuk factory air piping dan air tools. Banyak pilihan socket, plug, thread, hose nipple, polyurethane-tube, safety plug, lock, dan rotary membantu menyesuaikan layout tanpa mengganti interface dasarnya.",
      "CAL Type 20 is NAC's most widely used low-pressure, single-valve quick-coupling series for factory air piping and air tools. Its socket, plug, thread, hose-nipple, polyurethane-tube, safety-plug, lock, and rotary choices adapt to many layouts without changing the basic interface."
    ),
    features: [
      l("Ukuran nominal 1/8, 1/4, 3/8, dan 1/2 inci.", "Nominal sizes of 1/8, 1/4, 3/8, and 1/2 inch."),
      l("Pilihan body steel, brass, atau SUS304; NBR standar dan FKM tersedia untuk kebutuhan temperatur lebih tinggi.", "Steel, brass, or SUS304 bodies; standard NBR with FKM available for higher-temperature duty."),
      l("Safety plug PHV membantu membuang tekanan sisa secara bertahap saat dilepas.", "The PHV safety plug helps release residual pressure progressively during disconnection.")
    ],
    images: image("cal-type-20"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P1–P5",
    options: [
      option("cal20-thread", l("Thread connection", "Thread connection"), "CAL21 / CAL22 / CAL23 / CAL24 · SH/PH · SM/PM · SF/PF/PFG", "Single valve", "Female or male thread · 1/8–1/2 in", "Steel / brass / SUS304 · normal 1.0–1.5 MPa", l("Factory air, water, atau oil piping sesuai material.", "Factory air, water, or oil piping according to material.")),
      option("cal20-hose", l("Hose & polyurethane tube", "Hose & polyurethane tube"), "CAL21 / CAL22 / CAL23 / CAL24 · hose and SA/SB variants", "Single valve", "Hose nipple or polyurethane tube", "Steel / brass / SUS304 · NBR or FKM", l("Air tools dan flexible workshop lines.", "Air tools and flexible workshop lines.")),
      option("cal20-safety", l("Safety, lock & rotary", "Safety, lock & rotary"), "PHV / long-lock / rotary variants", "Single valve · controlled vent on PHV", "CAL Type 20 interface", "Select by body and seal option", l("Hose-twist reduction dan safer residual-air release.", "Hose-twist reduction and safer residual-air release."))
    ],
    selectionChecklist: checklist(
      l("Air atau oil untuk steel; air, water, dan fluida kompatibel untuk brass/SUS304. NBR −20–80 °C; FKM −20–180 °C.", "Air or oil for steel; air, water, and compatible fluids for brass/SUS304. NBR −20–80 °C; FKM −20–180 °C."),
      l("Steel/SUS304 normal 1,5 MPa, maksimum 2,0 MPa; brass normal 1,0 MPa, maksimum 1,5 MPa.", "Steel/SUS304: 1.5 MPa working, 2.0 MPa maximum; brass: 1.0 MPa working, 1.5 MPa maximum."),
      l("Tentukan CAL21, 22, 23, atau 24 lalu pilih female thread, male thread, hose, atau polyurethane tube.", "Choose CAL21, 22, 23, or 24, then female thread, male thread, hose, or polyurethane tube."),
      l("Konfirmasikan body steel/brass/SUS304 dan packing NBR/FKM terhadap fluida.", "Confirm steel/brass/SUS304 body and NBR/FKM packing against the fluid.")
    ),
    notes: [
      l("Socket dan plug harus berasal dari interface CAL Type 20 yang kompatibel.", "Socket and plug must use a compatible CAL Type 20 interface."),
      l("Gunakan PHV bila pelepasan tekanan sisa pada hose perlu dikendalikan.", "Use PHV where residual hose pressure needs controlled release.")
    ]
  },
  "cal-type-40": {
    kind: "coupling",
    overview: l(
      "CAL Type 40 membawa konstruksi low-pressure single-valve seri CAL ke ukuran bore yang lebih besar. Seri ini ditujukan untuk jalur yang membutuhkan flow lebih tinggi pada ukuran 1/2, 3/4, dan 1 inci.",
      "CAL Type 40 brings the CAL low-pressure single-valve construction to larger bore sizes. It serves lines that need higher flow at 1/2, 3/4, and 1 inch."
    ),
    features: [
      l("Tiga body size: CAL44, CAL46, dan CAL48.", "Three body sizes: CAL44, CAL46, and CAL48."),
      l("Female thread, male thread, hose nipple, serta PHV safety-plug configurations.", "Female-thread, male-thread, hose-nipple, and PHV safety-plug configurations."),
      l("Pilihan steel, brass, atau SUS304 memungkinkan penyesuaian terhadap media dan lingkungan.", "Steel, brass, or SUS304 choices adapt the series to the medium and environment.")
    ],
    images: image("cal-type-40"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P6–P9",
    options: [
      option("cal40-thread", l("Thread connection", "Thread connection"), "CAL44 / CAL46 / CAL48 · SH/PH · SM/PM · SF/PF", "Single valve", "Female or male thread · 1/2–1 in", "Steel / brass / SUS304 · normal 1.0–1.5 MPa", l("Main factory-air, water, atau oil lines.", "Main factory-air, water, or oil lines.")),
      option("cal40-hose", l("Hose connection", "Hose connection"), "CAL44 / CAL46 / CAL48 · hose variants", "Single valve", "Hose nipple · 1/2–1 in", "NBR standard · FKM option", l("Large flexible lines dan air tools.", "Large flexible lines and air tools.")),
      option("cal40-safety", l("Safety plug", "Safety plug"), "CAL44 / CAL46 / CAL48 · PHV", "Single valve · controlled vent", "CAL Type 40 socket interface", "Match body material to socket", l("Controlled release of residual pressure.", "Controlled release of residual pressure."))
    ],
    selectionChecklist: checklist(
      l("Air/oil pada steel; air/water dan fluida kompatibel pada brass atau SUS304.", "Air/oil with steel; air/water and compatible fluids with brass or SUS304."),
      l("Steel/SUS304 normal 1,5 MPa; brass normal 1,0 MPa.", "Steel/SUS304 working pressure 1.5 MPa; brass working pressure 1.0 MPa."),
      l("CAL44 = 1/2, CAL46 = 3/4, CAL48 = 1 inci.", "CAL44 = 1/2, CAL46 = 3/4, CAL48 = 1 inch."),
      l("Pilih body dan packing berdasarkan corrosion, temperatur, dan chemical compatibility.", "Choose body and packing by corrosion, temperature, and chemical compatibility.")
    ),
    notes: [
      l("CAL Type 40 tidak interchangeable dengan CAL Type 20.", "CAL Type 40 is not interchangeable with CAL Type 20."),
      l("Periksa pressure drop pada flow aktual, bukan hanya nominal pipe size.", "Check pressure drop at actual flow, not only nominal pipe size.")
    ]
  },
  "cat-type": {
    kind: "coupling",
    overview: l(
      "CAT Type adalah socket one-touch untuk jalur udara low-pressure. Plug cukup didorong masuk dengan satu tangan, dan CAT tetap kompatibel dengan plug CAL Type 20 sehingga upgrade socket dapat dilakukan tanpa mengganti seluruh plug.",
      "CAT Type is a one-touch socket for low-pressure air lines. The plug pushes in with one hand, and CAT remains compatible with CAL Type 20 plugs so the socket can be upgraded without replacing every plug."
    ),
    features: [
      l("One-hand push-to-connect untuk mempercepat pergantian air tool.", "One-hand push-to-connect operation speeds air-tool changes."),
      l("Kompatibel dengan CAL Type 20 plugs.", "Compatible with CAL Type 20 plugs."),
      l("Tersedia thread, hose, polyurethane tube, rotary, dan long-lock socket styles.", "Available in thread, hose, polyurethane-tube, rotary, and long-lock socket styles.")
    ],
    images: image("cat-type"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P10–P12",
    options: [
      option("cat-thread", l("Thread connection", "Thread connection"), "CAT21 / CAT22 / CAT23 / CAT24 · SH/SM/SF", "Single valve · one-touch socket", "Female or male thread · 1/8–1/2 in", "Chrome-plated steel · NBR · 1.0 MPa", l("Fixed factory-air outlets.", "Fixed factory-air outlets.")),
      option("cat-hose", l("Hose & tube connection", "Hose & tube connection"), "CAT21 / CAT22 / CAT23 / CAT24 · hose / SA / SB", "Single valve · one-touch socket", "Hose nipple or polyurethane tube", "Chrome-plated steel · NBR", l("Air tools dan drop hoses.", "Air tools and drop hoses.")),
      option("cat-rotary", l("Rotary & long-lock", "Rotary & long-lock"), "SAR / SBR / long-lock variants", "Single valve · one-touch socket", "CAL20-compatible plug side", "1.0 MPa working · 1.5 MPa max", l("Moving tools, hose-twist control, dan added sleeve retention.", "Moving tools, hose-twist control, and added sleeve retention."))
    ],
    selectionChecklist: checklist(
      l("Compressed air · NBR · −20–80 °C.", "Compressed air · NBR · −20–80 °C."),
      l("Normal 1,0 MPa; maksimum 1,5 MPa.", "1.0 MPa working; 1.5 MPa maximum."),
      l("Pilih nominal 1/8–1/2 inci dan termination thread, hose, atau tube.", "Choose 1/8–1/2 inch nominal size and thread, hose, or tube termination."),
      l("Chrome-plated steel; konfirmasikan kondisi korosif sebelum pemakaian.", "Chrome-plated steel; confirm corrosive conditions before use.")
    ),
    notes: [
      l("CAT adalah socket series; gunakan plug CAL Type 20 yang kompatibel.", "CAT is a socket series; use a compatible CAL Type 20 plug."),
      l("Depressurize line sebelum service atau penggantian fitting.", "Depressurize the line before service or fitting replacement.")
    ]
  },
  "multi-connection": {
    kind: "coupling",
    overview: l(
      "NAC Multi-Connection membagi satu inlet udara menjadi dua atau empat outlet. Versi straight memberikan manifold ringkas, sedangkan versi rotary membantu hose mengikuti gerakan tool dan mengurangi twisting.",
      "NAC Multi-Connection divides one air inlet into two or four outlets. Straight versions provide a compact manifold, while rotary versions help hoses follow tool movement and reduce twisting."
    ),
    features: [
      l("Pilihan dua atau empat outlet.", "Two- or four-outlet choices."),
      l("Tersedia interface CAL dan CAT.", "Available with CAL and CAT interfaces."),
      l("Versi two-way rotary dirancang untuk mengurangi hose twisting.", "Two-way rotary versions are designed to reduce hose twisting.")
    ],
    images: image("multi-connection"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P13–P14",
    options: [
      option("multi-cal", l("CAL multi-connection", "CAL multi-connection"), "CAL2L / CAL5L", "Single-valve CAL outlets", "2 or 4 outlets", "NBR · 1.5 MPa working", l("Branching factory-air lines with CAL plugs.", "Branching factory-air lines with CAL plugs.")),
      option("multi-cal-rotary", l("CAL rotary connection", "CAL rotary connection"), "CAL2WRL", "Single-valve CAL outlets · rotary body", "2 outlets", "NBR · 1.5 MPa working", l("Moving workstations dan hose-twist reduction.", "Moving workstations and hose-twist reduction.")),
      option("multi-cat", l("CAT multi-connection", "CAT multi-connection"), "CAT2L / CAT5L / CAT2WRL", "One-touch CAT outlets", "2 or 4 outlets", "NBR · 1.5 MPa working", l("Fast one-hand branching for air tools.", "Fast one-hand branching for air tools."))
    ],
    selectionChecklist: checklist(
      l("Compressed air; NBR standard, FKM option on applicable CAL arrangements.", "Compressed air; standard NBR, with FKM option on applicable CAL arrangements."),
      l("Normal 1,5 MPa; maksimum 2,0 MPa.", "1.5 MPa working; 2.0 MPa maximum."),
      l("Tentukan inlet, 2/4 outlet, CAL/CAT interface, dan kebutuhan rotary.", "Define inlet, 2/4 outlets, CAL/CAT interface, and rotary need."),
      l("Periksa berat hose dan support manifold pada instalasi bergerak.", "Check hose weight and manifold support on moving installations.")
    ),
    notes: [
      l("Total flow terbagi di seluruh outlet; sizing harus memakai simultaneous demand.", "Total flow is shared across outlets; size for simultaneous demand."),
      l("CAL5L memakai CAL44PM pada sisi inlet dan CAL20 sockets pada outlet.", "CAL5L uses CAL44PM at the inlet and CAL20 sockets at the outlets.")
    ]
  },
  "cal-type-10": {
    kind: "coupling",
    overview: l(
      "CAL Type 10 adalah seri one-touch yang compact dan ringan untuk pneumatic equipment kecil. Ukuran body yang lebih kecil membantu mengurangi beban pada tool dan hose, sementara konstruksinya dirancang untuk air leakage yang rendah.",
      "CAL Type 10 is a compact, lightweight one-touch series for small pneumatic equipment. Its smaller body reduces load on the tool and hose, while the construction is designed for low air leakage."
    ),
    features: [
      l("Ukuran CAL11 dan CAL12 untuk 1/8 dan 1/4 inci.", "CAL11 and CAL12 sizes for 1/8 and 1/4 inch."),
      l("Socket brass dan plug steel untuk keseimbangan bobot serta durability.", "Brass socket and steel plug balance weight and durability."),
      l("Thread, hose nipple, serta polyurethane tube terminations.", "Thread, hose-nipple, and polyurethane-tube terminations.")
    ],
    images: image("cal-type-10"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P15–P17",
    options: [
      option("cal10-thread", l("Thread connection", "Thread connection"), "CAL11 / CAL12 · SH/PH · SM/PM · SF/PF", "Single valve · one-touch", "Female or male thread · 1/8–1/4 in", "Brass socket / steel plug · 1.0 MPa", l("Compact pneumatic devices dan benchtop tools.", "Compact pneumatic devices and benchtop tools.")),
      option("cal10-tube", l("Hose & tube connection", "Hose & tube connection"), "CAL11 / CAL12 · PB / SB / hose variants", "Single valve · one-touch", "Hose nipple or polyurethane tube", "NBR standard · FKM option", l("Lightweight air-tool drops dan tubing.", "Lightweight air-tool drops and tubing."))
    ],
    selectionChecklist: checklist(
      l("Compressed air · NBR −20–80 °C or FKM −20–180 °C.", "Compressed air · NBR −20–80 °C or FKM −20–180 °C."),
      l("Normal 1,0 MPa; maksimum 1,5 MPa.", "1.0 MPa working; 1.5 MPa maximum."),
      l("CAL11 = 1/8; CAL12 = 1/4 inci. Pilih thread, hose, atau polyurethane tube.", "CAL11 = 1/8; CAL12 = 1/4 inch. Choose thread, hose, or polyurethane tube."),
      l("Socket brass, plug steel; konfirmasikan seal untuk temperatur.", "Brass socket, steel plug; confirm seal for temperature.")
    ),
    notes: [
      l("Jangan memasangkan CAL Type 10 dengan CAL Type 20 hanya berdasarkan kemiripan visual.", "Do not mate CAL Type 10 with CAL Type 20 based on visual similarity."),
      l("Gunakan size aktual tube dan thread saat meminta penawaran.", "Use actual tube and thread sizes in the quotation request.")
    ]
  },
  "ctl-type": {
    kind: "coupling",
    overview: l(
      "CTL Type adalah coupling medium-pressure valveless. Jalur alir tanpa shut-off valve menekan flow resistance dan pressure loss, sehingga cocok untuk media yang lebih viscous atau sirkuit yang akan diisolasi dengan valve terpisah.",
      "CTL Type is a valveless medium-pressure coupling. Its flow path has no shut-off valve, reducing resistance and pressure loss for more viscous media or circuits isolated by a separate valve."
    ),
    features: [
      l("Rentang sangat lebar dari 1/8 hingga 2 inci.", "Very broad size range from 1/8 through 2 inch."),
      l("Body brass, SUS304, atau steel.", "Brass, SUS304, or steel body."),
      l("Valveless bore membantu mempertahankan flow tetapi tidak menahan fluida saat disconnected.", "The valveless bore supports flow but does not retain fluid when disconnected.")
    ],
    images: image("ctl-type"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P18–P22",
    options: [
      option("ctl-small", l("Small sizes", "Small sizes"), "CTL01 / CTL02 / CTL03 / CTL04", "Valveless", "Female/male thread or hose · 1/8–1/2 in", "Brass / SUS304 / steel · up to 7.5 MPa working by material", l("Air, water, oil, dan viscous-fluid lines.", "Air, water, oil, and viscous-fluid lines.")),
      option("ctl-medium", l("Medium sizes", "Medium sizes"), "CTL06 / CTL08", "Valveless", "Female/male thread or hose · 3/4–1 in", "Material-dependent pressure rating", l("Higher-flow transfer circuits.", "Higher-flow transfer circuits.")),
      option("ctl-large", l("Large sizes", "Large sizes"), "CTL10 / CTL12 / CTL16", "Valveless", "Female/male thread · 1-1/4–2 in", "Material- and size-dependent rating", l("Large-bore low-loss fluid transfer.", "Large-bore low-loss fluid transfer."))
    ],
    selectionChecklist: checklist(
      l("Air, water, oil, atau compatible viscous fluid; steel untuk air/oil.", "Air, water, oil, or compatible viscous fluid; steel for air/oil."),
      l("Rating berubah menurut size/material: verifikasi tabel model, dari 1,5 hingga 7,5 MPa normal.", "Rating varies by size/material: verify the model table, from 1.5 to 7.5 MPa working."),
      l("CTL01–CTL16 mencakup 1/8–2 inci; tentukan thread atau hose.", "CTL01–CTL16 cover 1/8–2 inch; specify thread or hose."),
      l("Brass/SUS304 memakai FKM; steel memakai NBR pada konfigurasi katalog.", "Brass/SUS304 use FKM; steel uses NBR in catalogue configurations.")
    ),
    notes: [
      l("Karena valveless, kedua sisi harus diisolasi dan depressurized sebelum disconnection.", "Because it is valveless, isolate and depressurize both sides before disconnection."),
      l("Pressure rating turun pada sebagian ukuran besar; jangan memakai rating ukuran kecil.", "Pressure rating decreases for some large sizes; do not apply the small-size rating.")
    ]
  },
  "cns-type": {
    kind: "coupling",
    overview: l(
      "CNS Type adalah Non-drip Safety coupling NAC dengan twin automatic shut-off valves. Sealing baru mengurangi tetesan cairan saat disconnection sekitar 99,8% dibanding SPE pada kondisi uji NAC, sehingga membantu menjaga lantai lebih bersih, mengurangi slip risk, dan mengurangi material loss.",
      "CNS Type is NAC's Non-drip Safety coupling with twin automatic shut-off valves. Its new sealing method reduces liquid drip at disconnection by approximately 99.8% versus SPE under NAC test conditions, helping keep floors cleaner while reducing slip risk and material loss."
    ),
    features: [
      l("Measured disconnection drip hanya 0,008–0,099 mL bergantung ukuran pada data katalog.", "Catalogue disconnection-drip data ranges from only 0.008–0.099 mL depending on size."),
      l("SUS304 body dan FKM seal untuk air, water, oil, serta compatible fluids.", "SUS304 body and FKM seal for air, water, oil, and compatible fluids."),
      l("One-touch connection dengan pressure loss rendah.", "One-touch connection with low pressure loss.")
    ],
    images: image("cns-type"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P23–P25",
    options: [
      option("cns-small", l("1/4–1/2 inch", "1/4–1/2 inch"), "CNS02S3/P3 · CNS03S3/P3 · CNS04S3/P3", "Twin valve · non-drip", "Female thread · 1/4, 3/8, 1/2 in", "SUS304 / FKM · 3.5 MPa", l("Clean liquid, air, water, dan oil transfer.", "Clean liquid, air, water, and oil transfer.")),
      option("cns-large", l("3/4–1 inch", "3/4–1 inch"), "CNS06S3/P3 · CNS08S3/P3", "Twin valve · non-drip", "Female thread · 3/4, 1 in", "SUS304 / FKM · 3.5 MPa", l("Higher-flow lines where disconnection drip must be minimized.", "Higher-flow lines where disconnection drip must be minimized."))
    ],
    selectionChecklist: checklist(
      l("Air, water, oil, atau compatible fluid · FKM · −20–180 °C.", "Air, water, oil, or compatible fluid · FKM · −20–180 °C."),
      l("Normal 3,5 MPa; maksimum 5,3 MPa.", "3.5 MPa working; 5.3 MPa maximum."),
      l("CNS02/03/04/06/08 = 1/4, 3/8, 1/2, 3/4, dan 1 inci female thread.", "CNS02/03/04/06/08 = 1/4, 3/8, 1/2, 3/4, and 1 inch female thread."),
      l("SUS304 body dengan FKM packing; tetap verifikasi chemical compatibility.", "SUS304 body with FKM packing; still verify chemical compatibility.")
    ),
    notes: [
      l("Nilai 99,8% adalah perbandingan NAC terhadap SPE pada kondisi uji katalog; hasil aktual bergantung fluida, pressure, viscosity, dan service condition.", "The 99.8% figure is NAC's comparison with SPE under catalogue test conditions; actual results depend on fluid, pressure, viscosity, and service conditions."),
      l("Drip volume katalog per size: 02 0,008 mL; 03 0,009 mL; 04 0,012 mL; 06 0,055 mL; 08 0,099 mL.", "Catalogue drip volume by size: 02 0.008 mL; 03 0.009 mL; 04 0.012 mL; 06 0.055 mL; 08 0.099 mL.")
    ]
  },
  "cspe-type": {
    kind: "coupling",
    overview: l(
      "CSPE Type memakai jalur aliran besar dan halus pada coupling medium-pressure twin-valve. Katalog NAC menunjukkan peningkatan flow sekitar 130–188% terhadap tipe konvensional tergantung size, yang dapat membantu mengurangi pressure loss dan energi pompa atau kompresor.",
      "CSPE Type uses a large, smooth flow path in a medium-pressure twin-valve coupling. NAC catalogue data shows roughly 130–188% flow versus the conventional type depending on size, which can reduce pressure loss and pump or compressor energy."
    ),
    features: [
      l("Large-flow internal geometry untuk energy-saving piping.", "Large-flow internal geometry for energy-saving piping."),
      l("Twin valves menutup socket dan plug saat disconnected.", "Twin valves close both socket and plug when disconnected."),
      l("Pilihan brass atau SUS304 dengan FKM seal.", "Brass or SUS304 choices with FKM seals.")
    ],
    images: image("cspe-type"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P26–P28",
    options: [
      option("cspe-small", l("Small sizes", "Small sizes"), "CSPE01 / CSPE02 / CSPE03 · S2/P2 or S3/P3", "Twin valve · large flow", "Female thread · 1/8–3/8 in", "Brass up to 5 MPa; SUS304 up to 7.5 MPa working", l("High-efficiency small-bore fluid lines.", "High-efficiency small-bore fluid lines.")),
      option("cspe-large", l("Medium sizes", "Medium sizes"), "CSPE04 / CSPE06 / CSPE08 · S2/P2 or S3/P3", "Twin valve · large flow", "Female thread · 1/2–1 in", "Brass up to 3 MPa; SUS304 up to 4.5 MPa working", l("Higher-flow air, water, dan oil transfer.", "Higher-flow air, water, and oil transfer."))
    ],
    selectionChecklist: checklist(
      l("Air, water, oil, atau compatible fluid · FKM · −20–180 °C.", "Air, water, oil, or compatible fluid · FKM · −20–180 °C."),
      l("Rating bergantung size/material: brass 3–5 MPa, SUS304 4,5–7,5 MPa normal.", "Rating depends on size/material: brass 3–5 MPa, SUS304 4.5–7.5 MPa working."),
      l("CSPE01–08 = 1/8–1 inci female thread.", "CSPE01–08 = 1/8–1 inch female thread."),
      l("S2/P2 = brass; S3/P3 = SUS304; FKM packing.", "S2/P2 = brass; S3/P3 = SUS304; FKM packing.")
    ),
    notes: [
      l("Flow improvement berbeda menurut size dan kondisi; gunakan curve katalog untuk sizing.", "Flow improvement varies by size and conditions; use catalogue curves for sizing."),
      l("Jangan mencampur material socket dan plug tanpa compatibility review.", "Do not mix socket and plug materials without a compatibility review.")
    ]
  },
  "csp-type": {
    kind: "coupling",
    overview: l(
      "CSP Type adalah keluarga medium-pressure twin-valve yang menutup sisi socket dan plug otomatis saat dilepas. Rentang size 1/8 hingga 2 inci dan pilihan material membuatnya sesuai untuk banyak fluid-transfer circuits.",
      "CSP Type is a medium-pressure twin-valve family that automatically closes both socket and plug when disconnected. Its 1/8- to 2-inch size range and material choices cover many fluid-transfer circuits."
    ),
    features: [
      l("Automatic shut-off pada kedua sisi membantu mencegah fluid spout dan air mixing.", "Automatic shut-off on both sides helps prevent fluid spout and air mixing."),
      l("Rentang CSP01 sampai CSP16.", "Range from CSP01 through CSP16."),
      l("Steel, brass, dan SUS304 configurations dengan packing yang disesuaikan.", "Steel, brass, and SUS304 configurations with matched packing.")
    ],
    images: image("csp-type"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P29–P31",
    options: [
      option("csp-small", l("Small sizes", "Small sizes"), "CSP01 / CSP02 / CSP03 / CSP04 · S/P, S2/P2, S3/P3", "Twin automatic shut-off", "Female thread · 1/8–1/2 in", "Steel / brass / SUS304 · material-dependent rating", l("General medium-pressure fluid transfer.", "General medium-pressure fluid transfer.")),
      option("csp-medium", l("Medium sizes", "Medium sizes"), "CSP06 / CSP08", "Twin automatic shut-off", "Female thread · 3/4–1 in", "Steel · NBR · size-dependent rating", l("Higher-flow air and oil lines.", "Higher-flow air and oil lines.")),
      option("csp-large", l("Large sizes", "Large sizes"), "CSP10 / CSP12 / CSP16", "Twin automatic shut-off", "Female thread · 1-1/4–2 in", "Steel / brass / SUS304 options by size", l("Large fluid-transfer circuits.", "Large fluid-transfer circuits."))
    ],
    selectionChecklist: checklist(
      l("Steel for air/oil; brass or SUS304 also for compatible water duty.", "Steel for air/oil; brass or SUS304 also for compatible water duty."),
      l("Pressure rating varies materially by size and body; select from the exact model table.", "Pressure rating varies materially by size and body; select from the exact model table."),
      l("CSP01–16 covers 1/8–2 inch female-thread connections.", "CSP01–16 covers 1/8–2 inch female-thread connections."),
      l("S/P = steel, S2/P2 = brass, S3/P3 = SUS304 where catalogued.", "S/P = steel, S2/P2 = brass, S3/P3 = SUS304 where catalogued.")
    ),
    notes: [
      l("Kedua valve menahan fluida, tetapi line tetap harus depressurized untuk maintenance.", "Both valves retain fluid, but the line must still be depressurized for maintenance."),
      l("Untuk minimum drip saat disconnection, bandingkan dengan CNS Non-drip Safety.", "For minimum disconnection drip, compare with CNS Non-drip Safety.")
    ]
  },
  "csp-v-type": {
    kind: "coupling",
    overview: l(
      "CSP-V adalah versi vacuum dari keluarga CSP untuk air-conditioner piping dan vacuum service. Twin valves menutup kedua sisi, sementara double O-ring dan packing CR mendukung vacuum performance hingga 1,3 × 10⁻¹ Pa pada data katalog.",
      "CSP-V is the vacuum version of the CSP family for air-conditioning piping and vacuum service. Twin valves close both sides, while double O-rings and CR packing support catalogue vacuum performance to 1.3 × 10⁻¹ Pa."
    ),
    features: [
      l("Model 1/4 dan 3/8 inci.", "Models in 1/4 and 3/8 inch."),
      l("Pilihan brass atau SUS304.", "Brass or SUS304 choices."),
      l("Twin-valve construction untuk menutup kedua jalur saat disconnected.", "Twin-valve construction closes both lines when disconnected.")
    ],
    images: image("csp-v-type"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P32–P34",
    options: [
      option("cspv-brass", l("Brass vacuum type", "Brass vacuum type"), "CSP02S2V/P2V · CSP03S2V/P2V", "Twin valve · double O-ring", "Female thread · 1/4 or 3/8 in", "Brass / CR", l("Air-conditioning dan vacuum service lines.", "Air-conditioning and vacuum service lines.")),
      option("cspv-stainless", l("Stainless vacuum type", "Stainless vacuum type"), "CSP02S3V/P3V · CSP03S3V/P3V", "Twin valve · double O-ring", "Female thread · 1/4 or 3/8 in", "SUS304 / CR", l("Vacuum service needing stainless body compatibility.", "Vacuum service needing stainless body compatibility."))
    ],
    selectionChecklist: checklist(
      l("Vacuum-compatible gas/service · CR · −20–80 °C.", "Vacuum-compatible gas/service · CR · −20–80 °C."),
      l("Specify required operating vacuum and positive-pressure cleaning conditions.", "Specify required operating vacuum and positive-pressure cleaning conditions."),
      l("CSP02-V = 1/4; CSP03-V = 3/8 inch female thread.", "CSP02-V = 1/4; CSP03-V = 3/8 inch female thread."),
      l("Choose brass S2V/P2V or SUS304 S3V/P3V.", "Choose brass S2V/P2V or SUS304 S3V/P3V.")
    ),
    notes: [
      l("Vacuum performance 1,3 × 10⁻¹ Pa adalah data katalog; system leak rate juga dipengaruhi hose, thread seal, dan installation.", "Vacuum performance of 1.3 × 10⁻¹ Pa is catalogue data; system leak rate also depends on hose, thread sealing, and installation."),
      l("Pastikan elastomer kompatibel dengan refrigerant dan service oil aktual.", "Confirm elastomer compatibility with the actual refrigerant and service oil.")
    ]
  },
  "chp-type": {
    kind: "coupling",
    overview: l(
      "CHP Type adalah coupling twin-valve dari heat-treated chrome-molybdenum steel untuk hydraulic equipment dan jalur bertekanan tinggi. Katalog menetapkan normal working pressure sampai 20,5 MPa.",
      "CHP Type is a twin-valve coupling made from heat-treated chromium-molybdenum steel for hydraulic equipment and high-pressure lines. The catalogue specifies working pressure up to 20.5 MPa."
    ),
    features: [
      l("Rentang size 1/4 hingga 2 inci.", "Size range from 1/4 through 2 inch."),
      l("Chrome-moly steel heat-treated body untuk high-pressure duty.", "Heat-treated chrome-moly steel body for high-pressure duty."),
      l("Single- dan double-sleeve lock options tersedia pada aplikasi tertentu.", "Single- and double-sleeve lock options are available for applicable duties.")
    ],
    images: image("chp-type"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P35–P37",
    options: [
      option("chp-small", l("Small high-pressure", "Small high-pressure"), "CHP02 / CHP03 / CHP04 · S/P", "Twin valve", "Female thread · 1/4–1/2 in", "Cr-Mo steel / NBR · 20.5 MPa working", l("Hydraulic tools dan compact high-pressure lines.", "Hydraulic tools and compact high-pressure lines.")),
      option("chp-large", l("Large high-pressure", "Large high-pressure"), "CHP06 / CHP08 / CHP10 / CHP12 / CHP16 · S/P", "Twin valve", "Female thread · 3/4–2 in", "Cr-Mo steel / NBR · verify size rating", l("Hydraulic equipment dan high-flow pressure lines.", "Hydraulic equipment and high-flow pressure lines.")),
      option("chp-lock", l("Sleeve-lock options", "Sleeve-lock options"), "Single / double sleeve lock; male-thread option by request", "Twin valve · additional retention", "Application-specific", "Engineered option", l("Vibration, impact, atau release-risk control.", "Vibration, impact, or release-risk control."))
    ],
    selectionChecklist: checklist(
      l("Hydraulic oil or compatible high-pressure medium · NBR.", "Hydraulic oil or compatible high-pressure medium · NBR."),
      l("Up to 20,5 MPa normal working; verify maximum and size-specific data.", "Up to 20.5 MPa working; verify maximum and size-specific data."),
      l("CHP02–16 = 1/4–2 inch; confirm thread form and sleeve-lock need.", "CHP02–16 = 1/4–2 inch; confirm thread form and sleeve-lock need."),
      l("Heat-treated chrome-moly steel; review corrosion environment.", "Heat-treated chrome-moly steel; review the corrosion environment.")
    ),
    notes: [
      l("High-pressure selection requires actual peak pressure, impulse cycle, temperature, dan fluid data.", "High-pressure selection requires actual peak pressure, impulse cycle, temperature, and fluid data."),
      l("Never disconnect while the line is pressurized.", "Never disconnect while the line is pressurized.")
    ]
  },
  "csh-type": {
    kind: "coupling",
    overview: l(
      "CSH Type menggabungkan high-pressure performance dengan SUS304 body, FKM packing, dan double-sleeve lock. Seri ini ditujukan untuk air, water, oil, serta compatible gases ketika corrosion resistance dan retention terhadap vibration atau impact dibutuhkan.",
      "CSH Type combines high-pressure performance with a SUS304 body, FKM packing, and double-sleeve lock. It is intended for air, water, oil, and compatible gases where corrosion resistance and retention against vibration or impact are required."
    ),
    features: [
      l("Normal working pressure sampai 20,5 MPa.", "Working pressure up to 20.5 MPa."),
      l("SUS304/FKM untuk temperature range −20–180 °C.", "SUS304/FKM for a −20–180 °C temperature range."),
      l("Double-sleeve lock membantu mencegah unintended release.", "Double-sleeve lock helps prevent unintended release.")
    ],
    images: image("csh-type"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P38–P40",
    options: [
      option("csh-small", l("Small stainless high-pressure", "Small stainless high-pressure"), "CSH02S3/P3 · CSH03S3/P3 · CSH04S3/P3", "Twin valve · double-sleeve lock", "Female thread · 1/4–1/2 in", "SUS304 / FKM · 20.5 MPa", l("Corrosive or clean high-pressure fluid lines.", "Corrosive or clean high-pressure fluid lines.")),
      option("csh-large", l("Large stainless high-pressure", "Large stainless high-pressure"), "CSH06S3/P3 · CSH08S3/P3", "Twin valve · double-sleeve lock", "Female thread · 3/4–1 in", "SUS304 / FKM · 20.5 MPa", l("Higher-flow stainless high-pressure service.", "Higher-flow stainless high-pressure service."))
    ],
    selectionChecklist: checklist(
      l("Air, water, oil, atau compatible gas/fluid · FKM · −20–180 °C.", "Air, water, oil, or compatible gas/fluid · FKM · −20–180 °C."),
      l("Normal 20,5 MPa; verify maximum, impulse, dan cycle requirements.", "20.5 MPa working; verify maximum, impulse, and cycle requirements."),
      l("CSH02/03/04/06/08 = 1/4–1 inch female thread.", "CSH02/03/04/06/08 = 1/4–1 inch female thread."),
      l("SUS304/FKM; confirm chemical compatibility and cleanliness.", "SUS304/FKM; confirm chemical compatibility and cleanliness.")
    ),
    notes: [
      l("Dust cover adalah standard accessory pada seri CSH dan harus dipasang saat disconnected.", "A dust cover is a standard CSH accessory and should be fitted while disconnected."),
      l("Double-sleeve lock menambah retention, bukan izin untuk disconnect under pressure.", "The double-sleeve lock adds retention; it does not permit disconnection under pressure.")
    ]
  },
  "ckc-type": {
    kind: "coupling",
    overview: l(
      "CKC Type dirancang untuk jalur cooling water pada mold. Brass body, FKM packing, dan socket sleeve yang panjang mempermudah akses saat mold diganti, dengan pilihan valved maupun valveless untuk menyesuaikan drain behavior.",
      "CKC Type is designed for mold cooling-water lines. Its brass body, FKM packing, and extended socket sleeve improve access during mold changes, with valved and valveless choices to suit drain behavior."
    ),
    features: [
      l("Nominal size 1/8, 1/4, dan 3/8 inci.", "Nominal sizes of 1/8, 1/4, and 3/8 inch."),
      l("Long sleeve memudahkan engagement di area mold yang terbatas.", "The long sleeve eases engagement in restricted mold areas."),
      l("Thread connection options pada socket dan plug.", "Thread-connection options on socket and plug.")
    ],
    images: image("ckc-type"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P41–P43",
    options: [
      option("ckc-hose", l("Hose connection", "Hose connection"), "CKC01 / CKC02 / CKC03 · SH2/PH2", "Single valve", "Hose nipple · 1/8–3/8 in", "Brass / FKM", l("Flexible mold cooling-water circuits.", "Flexible mold cooling-water circuits.")),
      option("ckc-thread", l("Thread connection", "Thread connection"), "CKC01 / CKC02 / CKC03 · SM2/PM2 · SF2/PF2", "Single valve or valveless option", "Male or female thread · 1/8–3/8 in", "Brass / FKM", l("Fixed mold manifolds and cooling ports.", "Fixed mold manifolds and cooling ports."))
    ],
    selectionChecklist: checklist(
      l("Cooling water or compatible coolant · FKM.", "Cooling water or compatible coolant · FKM."),
      l("Provide actual water pressure, temperature, and surge conditions.", "Provide actual water pressure, temperature, and surge conditions."),
      l("CKC01/02/03 = 1/8, 1/4, 3/8 inch; choose hose, male, or female thread.", "CKC01/02/03 = 1/8, 1/4, 3/8 inch; choose hose, male, or female thread."),
      l("Brass body; review water chemistry and dezincification risk.", "Brass body; review water chemistry and dezincification risk.")
    ),
    notes: [
      l("Valveless versions allow drain-out at disconnection; plan collection and isolation.", "Valveless versions allow drain-out at disconnection; plan collection and isolation."),
      l("Check interference around the extended sleeve in the mold layout.", "Check interference around the extended sleeve in the mold layout.")
    ]
  },
  "dust-covers": {
    kind: "coupling",
    overview: l(
      "NAC dust covers melindungi socket dan plug yang sedang tidak tersambung dari debu dan kerusakan sealing surface. Model memakai suffix SDC untuk socket dan PDC untuk plug, dengan size yang mengikuti coupling family.",
      "NAC dust covers protect disconnected sockets and plugs from dust and sealing-surface damage. Model suffixes are SDC for sockets and PDC for plugs, sized to the coupling family."
    ),
    features: [
      l("Vinyl-chloride-resin cover untuk protection selama storage atau disconnected state.", "Vinyl-chloride-resin cover for protection during storage or while disconnected."),
      l("Coverage untuk CAL10/20/40, CTL, CSPE, CSP, CHP, CSP-V, dan CSH.", "Coverage for CAL10/20/40, CTL, CSPE, CSP, CHP, CSP-V, and CSH."),
      l("CSH dust cover supplied as standard accessory; family lain dipilih sesuai tabel.", "The CSH dust cover is a standard accessory; other families are selected from the table.")
    ],
    images: image("dust-covers"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P44",
    options: [
      option("dust-socket", l("Socket dust cover", "Socket dust cover"), "CAL / CTL / CSPE / CSP / CHP / CSP-V / CSH + SDC", "Protective accessory", "Family- and size-matched socket", "Vinyl chloride resin", l("Menutup socket saat disconnected.", "Covers the socket while disconnected.")),
      option("dust-plug", l("Plug dust cover", "Plug dust cover"), "CAL / CTL / CSPE / CSP / CHP / CSP-V / CSH + PDC", "Protective accessory", "Family- and size-matched plug", "Vinyl chloride resin", l("Menutup plug saat disconnected.", "Covers the plug while disconnected."))
    ],
    selectionChecklist: checklist(
      l("Konfirmasikan exposure terhadap oil, chemical, heat, dan outdoor weather.", "Confirm exposure to oil, chemicals, heat, and outdoor weather."),
      l("Accessory tidak membawa pressure.", "The accessory carries no pressure."),
      l("Sertakan coupling family, exact size, dan socket/plug side.", "Provide coupling family, exact size, and socket/plug side."),
      l("Vinyl chloride resin; verify environmental compatibility.", "Vinyl chloride resin; verify environmental compatibility.")
    ),
    notes: [
      l("Dust cover bukan pressure cap dan tidak boleh dipakai untuk menutup jalur bertekanan.", "A dust cover is not a pressure cap and must not close a pressurized line."),
      l("Gunakan exact SDC/PDC model dari tabel katalog, bukan hanya diameter luar.", "Use the exact SDC/PDC model from the catalogue table, not only outside diameter.")
    ]
  },
  "cch-type": {
    kind: "coupling",
    overview: l(
      "CCH Type menggabungkan polyurethane coil tube yang ringan dan fleksibel dengan quick coupling CAL Type 20 atau CAT. Pilihan diameter, panjang, straight/rotary socket, dan termination memungkinkan assembly siap pakai untuk air tools.",
      "CCH Type combines a lightweight, flexible polyurethane coil tube with CAL Type 20 or CAT quick couplings. Diameter, length, straight/rotary socket, and termination choices create ready-to-use air-tool assemblies."
    ),
    features: [
      l("Tube 8 × 5, 10 × 6,5, atau 12 × 8 mm.", "Tube sizes of 8 × 5, 10 × 6.5, or 12 × 8 mm."),
      l("Total length 2,5, 5, 7,5, atau 10 m.", "Total lengths of 2.5, 5, 7.5, or 10 m."),
      l("Pilihan CAL20, CAT, rotary, ball-swivel, atau tanpa coupling.", "CAL20, CAT, rotary, ball-swivel, or no-coupling choices.")
    ],
    images: image("cch-type"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P45–P46",
    options: [
      option("cch-tube", l("Tube size & length", "Tube size & length"), "CCH0805 / CCH1065 / CCH1208 · length symbols 3/5/8/10", "Tube assembly", "8×5 / 10×6.5 / 12×8 mm · 2.5–10 m", "Polyurethane · 0.8 MPa", l("Flexible workshop air supply.", "Flexible workshop air supply.")),
      option("cch-cal", l("CAL20 coupling set", "CAL20 coupling set"), "Suffix L / LR / LB / LRB", "CAL20 straight, rotary, or ball-swivel", "Factory-configured ends", "Polyurethane tube · yellow", l("Air tools using CAL Type 20 interface.", "Air tools using the CAL Type 20 interface.")),
      option("cch-cat", l("CAT coupling set", "CAT coupling set"), "Suffix S / SR / SB / SRB", "CAT straight, rotary, or ball-swivel", "Factory-configured ends", "Polyurethane tube · yellow", l("One-touch air-tool connection.", "One-touch air-tool connection.")),
      option("cch-none", l("Tube only", "Tube only"), "Suffix X", "No coupling", "Plain tube ends", "Polyurethane tube · yellow", l("Customer-specified fittings.", "Customer-specified fittings."))
    ],
    selectionChecklist: checklist(
      l("Compressed air · −20–60 °C.", "Compressed air · −20–60 °C."),
      l("Normal 0,8 MPa.", "0.8 MPa working."),
      l("Specify tube OD×ID, total length symbol, dan CAL/CAT end arrangement.", "Specify tube OD×ID, total length symbol, and CAL/CAT end arrangement."),
      l("Yellow polyurethane tube; check abrasion, sparks, and chemical exposure.", "Yellow polyurethane tube; check abrasion, sparks, and chemical exposure.")
    ),
    notes: [
      l("Total length dan usable coiled length berbeda; konfirmasikan required reach.", "Total length and usable coiled length differ; confirm required reach."),
      l("Rotary/ball-swivel end membantu hose movement tetapi tetap membutuhkan bend clearance.", "A rotary/ball-swivel end helps hose movement but still needs bend clearance.")
    ]
  },
  "special-couplings": {
    kind: "coupling",
    overview: l(
      "NAC Special Couplings adalah engineered-to-order solutions untuk interface, material, seal, actuation, vacuum, atau pressure duty yang tidak dapat dipenuhi model standar. Contoh katalog mencakup stainless dust covers, male-thread high-pressure plugs, engine-test couplings, double-O-ring vacuum designs, high-pressure washer couplings, dan automatic hydraulic-cylinder connection.",
      "NAC Special Couplings are engineered-to-order solutions for interfaces, materials, seals, actuation, vacuum, or pressure duties beyond standard models. Catalogue examples include stainless dust covers, male-thread high-pressure plugs, engine-test couplings, double-O-ring vacuum designs, high-pressure washer couplings, and automatic hydraulic-cylinder connection."
    ),
    features: [
      l("Dapat dibuat berdasarkan drawing, mating sample, atau application requirements.", "Can be developed from a drawing, mating sample, or application requirements."),
      l("Katalog memperlihatkan solusi valved/valveless, vacuum, high-pressure, dan automatic actuation.", "Catalogue examples cover valved/valveless, vacuum, high-pressure, and automatic actuation."),
      l("Cocok untuk kebutuhan khusus dan volume rendah setelah engineering review.", "Suitable for specialized and low-volume needs following engineering review.")
    ],
    images: image("special-couplings"),
    catalogueReference: "NAC Quick Couplings vol. 9 · P47",
    options: [
      option("special-interface", l("Custom interface", "Custom interface"), "Made to drawing / mating sample", "Valved or valveless", "Custom thread, tube, flange, or profile", "Material and pressure engineered", l("Legacy equipment, uncommon mating parts, dan packaging constraints.", "Legacy equipment, uncommon mating parts, and packaging constraints.")),
      option("special-service", l("Custom service duty", "Custom service duty"), "Application-engineered", "Single valve / twin valve / vacuum seal", "Application-specific", "Seal, body, and rating engineered", l("Vacuum, engine test, washer, high-pressure, atau special fluid.", "Vacuum, engine test, washer, high pressure, or special fluid.")),
      option("special-auto", l("Automatic connection", "Automatic connection"), "Hydraulic-cylinder / machine-actuated concept", "Machine-actuated coupling", "Custom alignment and stroke", "Engineered after review", l("Automated test rigs and production equipment.", "Automated test rigs and production equipment."))
    ],
    selectionChecklist: checklist(
      l("Identify fluid, concentration, contamination limit, temperature range, dan cleaning method.", "Identify fluid, concentration, contamination limit, temperature range, and cleaning method."),
      l("Provide working/peak pressure, vacuum target, impulse cycles, and disconnect state.", "Provide working/peak pressure, vacuum target, impulse cycles, and disconnect state."),
      l("Provide drawing or sample, thread standard, envelope, mating stroke, and target quantity.", "Provide drawing or sample, thread standard, envelope, mating stroke, and target quantity."),
      l("Define body, seal, plating, cleanliness, corrosion, dan regulatory requirements.", "Define body, seal, plating, cleanliness, corrosion, and regulatory requirements.")
    ),
    notes: [
      l("Special coupling bukan fixed catalogue model; final specification dan feasibility ditentukan setelah NAC engineering review.", "A special coupling is not a fixed catalogue model; final specification and feasibility follow NAC engineering review."),
      l("Sertakan annual quantity dan prototype quantity—NAC dapat menilai kebutuhan custom dalam volume rendah.", "Include annual and prototype quantity—NAC can evaluate low-volume custom requirements.")
    ]
  }
};
