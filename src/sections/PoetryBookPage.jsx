import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BookOpenText, Download, ExternalLink, Headphones, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../components/Container";

const poetryBookFile = "/gwachey-dreamer-poetry-book.pdf";

const poemCategories = [
  {
    id: "becoming",
    label: "Self & Becoming",
    description: "Poems about selfhood, courage, and the decision to become visible.",
    poemIds: ["fire-within", "fire-within-ii"],
  },
  {
    id: "love-distance",
    label: "Love & Distance",
    description: "Poems shaped by longing, absence, devotion, and emotional memory.",
    poemIds: [
      "meeting-after-years",
      "if-we-meet-again",
      "blind-love",
      "loving-from-far-away",
      "her-voice",
      "for-better-or-worse",
    ],
  },
  {
    id: "dream-fractures",
    label: "Dreams & Fractures",
    description: "Poems built from surreal imagery, dream logic, and inner fracture.",
    poemIds: ["conception-of-dream"],
  },
  {
    id: "human-truth",
    label: "Humanity & Truth",
    description: "Poems that look beneath appearances toward pain, compassion, and truth.",
    poemIds: ["being-human", "silent-truth"],
  },
];

const getDashboardItemKey = (item, index) => `${item.title}-${index}`;
const getPoemLocation = (poem) => poem?.pageLabel || "Archive Edition";

export function PoetryBookPage({ items = [], bookMeta, bookPoems = [], onBack }) {
  const [activePoemId, setActivePoemId] = useState(bookPoems[0]?.id ?? "");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  useEffect(() => {
    if (!bookPoems.length) {
      setActivePoemId("");
      return;
    }

    const stillExists = bookPoems.some((poem) => poem.id === activePoemId);
    if (!stillExists) {
      setActivePoemId(bookPoems[0].id);
    }
  }, [activePoemId, bookPoems]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const categorizedPoems = useMemo(
    () =>
      poemCategories
        .map((category) => ({
          ...category,
          poems: category.poemIds
            .map((poemId) => bookPoems.find((poem) => poem.id === poemId))
            .filter(Boolean),
        }))
        .filter((category) => category.poems.length > 0),
    [bookPoems],
  );

  const filteredCategories = useMemo(
    () =>
      categorizedPoems
        .map((category) => ({
          ...category,
          poems: category.poems.filter((poem) => {
            const matchesCategory =
              selectedCategoryId === "all" || selectedCategoryId === category.id;
            const matchesQuery =
              !normalizedQuery ||
              [poem.title, poem.blurb, poem.category, poem.type, ...poem.lines]
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery);

            return matchesCategory && matchesQuery;
          }),
        }))
        .filter((category) => category.poems.length > 0),
    [categorizedPoems, normalizedQuery, selectedCategoryId],
  );

  const filteredDashboardPoems = useMemo(
    () =>
      items.filter((item) => {
        const haystack = [item.title, item.type, item.excerpt, item.note].join(" ").toLowerCase();
        return !normalizedQuery || haystack.includes(normalizedQuery);
      }),
    [items, normalizedQuery],
  );

  const activePoem = useMemo(
    () => bookPoems.find((poem) => poem.id === activePoemId) ?? bookPoems[0] ?? null,
    [activePoemId, bookPoems],
  );

  const activeCategory = useMemo(
    () =>
      categorizedPoems.find((category) =>
        category.poems.some((poem) => poem.id === activePoem?.id),
      ) ?? categorizedPoems[0] ?? null,
    [activePoem, categorizedPoems],
  );

  const activePoemIndex = activePoem
    ? bookPoems.findIndex((poem) => poem.id === activePoem.id)
    : -1;

  useEffect(() => {
    const poemElements = bookPoems
      .map((poem) => document.getElementById(`poem-${poem.id}`))
      .filter(Boolean);

    if (!poemElements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const nextId = visible?.target?.getAttribute("data-poem-id");
        if (nextId) {
          setActivePoemId(nextId);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-10% 0px -35% 0px",
      },
    );

    poemElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [bookPoems]);

  const scrollToPoem = (poemId) => {
    const poemElement = document.getElementById(`poem-${poemId}`);
    if (!poemElement) return;

    setActivePoemId(poemId);
    poemElement.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToCategory = (categoryId) => {
    const categoryElement = document.getElementById(`category-${categoryId}`);
    if (!categoryElement) return;

    categoryElement.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToDashboardItem = (item, index) => {
    const itemElement = document.getElementById(`dashboard-poem-${getDashboardItemKey(item, index)}`);
    if (!itemElement) return;

    itemElement.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hasBookResults = filteredCategories.length > 0;
  const hasDashboardResults = filteredDashboardPoems.length > 0;

  return (
    <section className="poetry-room section-shell relative min-h-screen overflow-hidden border-b border-white/6 py-24 sm:py-28 lg:py-32">
      <div className="poetry-room-glow pointer-events-none absolute inset-0" />

      <Container>
        <nav className="poetry-nav glass-panel sticky top-4 z-30 mb-10 rounded-full px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#f5ecd8]/10">
                <BookOpenText size={18} className="text-[#eadfc8]" />
              </div>
              <div>
                <p className="poetry-kicker">Reading Edition</p>
                <p className="font-serif text-lg italic text-[#f3ead9]">Gwachey Dreamer Poetry Book</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-[#e6d6b8]">
              <a className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white" href="#opening">
                Opening
              </a>
              <a className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white" href="#contents">
                Contents
              </a>
              <a className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white" href="#reading">
                Reading
              </a>
              <a className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white" href="#poems">
                Poems
              </a>
            </div>
          </div>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4" id="opening">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>

          <div className="flex flex-wrap gap-3">
            <a
              href={poetryBookFile}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
            >
              <ExternalLink size={16} />
              Open PDF
            </a>
            <a
              href={poetryBookFile}
              download
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-abyss transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              <Download size={16} />
              Download Book
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-8 xl:grid-cols-[0.94fr,1.06fr]">
          <div className="book-panel rounded-[2rem] p-8 sm:p-10">
            <div className="flex items-center gap-3 text-[#e6d6b8]">
              <BookOpenText size={18} />
              <p className="poetry-kicker">Poetry Book</p>
            </div>
            <h1 className="mt-6 max-w-lg font-serif text-4xl italic leading-[0.95] text-[#fff6e8] sm:text-5xl lg:text-[4rem]">
              {bookMeta?.title || "Gwachey Dreamer"}
            </h1>
            <p className="poetry-kicker mt-5">
              {bookMeta?.subtitle || "A Collection of Lost Soul Poetry"}
            </p>
          </div>

          <div className="book-spread rounded-[2rem] p-4 sm:p-5" id="contents">
            <div className="rounded-[1.6rem] border border-[#c9baa1]/10 bg-[#f4ead8]/[0.06] p-6">
              <p className="poetry-kicker">Table of Contents</p>
              <div className="mt-6 grid gap-3">
                <label className="relative block">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#d9c6a1]"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search titles, lines, or themes"
                    className="w-full rounded-[1.1rem] border border-white/10 bg-black/15 py-3 pl-11 pr-4 text-sm text-[#fff6e8] outline-none transition placeholder:text-[#b5a994] focus:border-[#cfbfa4]/30"
                  />
                </label>

                <div className="flex flex-wrap gap-2">
                  {poemCategories.map((category) => (
                    <FilterButton
                      key={category.id}
                      active={selectedCategoryId === category.id}
                      onClick={() =>
                        setSelectedCategoryId((current) =>
                          current === category.id ? "all" : category.id,
                        )
                      }
                    >
                      {category.label}
                    </FilterButton>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="rounded-[1.35rem] border border-white/8 bg-black/10 p-4"
                    >
                      <button
                        type="button"
                        onClick={() => scrollToCategory(category.id)}
                        className="block w-full rounded-[1.1rem] border border-white/8 px-4 py-4 text-left transition hover:bg-white/[0.04]"
                      >
                        <p className="poetry-kicker">Category</p>
                        <h2 className="mt-2 font-serif text-[1.65rem] italic text-[#fff6e8]">
                          {category.label}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-[#d9ccb7]">
                          {category.description}
                        </p>
                      </button>

                      <div className="mt-4 space-y-3">
                        {category.poems.map((poem) => (
                            <button
                              key={poem.id}
                              type="button"
                              onClick={() => scrollToPoem(poem.id)}
                              className={`block w-full rounded-[1.1rem] border px-4 py-4 text-left transition ${
                                activePoemId === poem.id
                                  ? "border-[#cfbfa4]/28 bg-white/[0.08]"
                                  : "border-white/8 hover:bg-white/[0.04]"
                              }`}
                            >
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                  <p className="poetry-kicker">{poem.type}</p>
                                  <h3 className="mt-2 font-serif text-xl italic text-[#fff6e8]">
                                    {poem.title}
                                  </h3>
                                </div>
                                <span className="poetry-meta">{getPoemLocation(poem)}</span>
                              </div>
                            </button>
                        ))}
                      </div>
                    </div>
                  ))}

                {hasDashboardResults ? (
                  <div className="rounded-[1.35rem] border border-white/8 bg-black/10 p-4">
                    <p className="poetry-kicker">Dashboard Additions</p>
                    <h2 className="mt-2 font-serif text-[1.65rem] italic text-[#fff6e8]">
                      Added From Admin
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#d9ccb7]">
                      New poems from the admin dashboard appear here and in the archive below.
                    </p>
                    <div className="mt-4 space-y-3">
                      {filteredDashboardPoems.map((item, index) => (
                        <button
                          key={getDashboardItemKey(item, index)}
                          type="button"
                          onClick={() => scrollToDashboardItem(item, index)}
                          className="block w-full rounded-[1.1rem] border border-white/8 px-4 py-4 text-left transition hover:bg-white/[0.04]"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="poetry-kicker">{item.type}</p>
                              <h3 className="mt-2 font-serif text-xl italic text-[#fff6e8]">
                                {item.title}
                              </h3>
                            </div>
                            <span className="poetry-meta">Admin</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {!hasBookResults && !hasDashboardResults ? (
                  <div className="rounded-[1.35rem] border border-white/8 bg-black/10 p-5">
                    <p className="text-sm leading-7 text-[#d9ccb7]">
                      No poems matched this search yet. Try a wider keyword or switch filters.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div
          id="reading"
          className="mt-14 grid gap-8 xl:grid-cols-[0.86fr,1.14fr]"
        >
          <aside className="space-y-6">
            <div className="book-panel rounded-[1.8rem] p-6 sm:p-7">
              <p className="poetry-kicker">Reading Guide</p>
              <h2 className="mt-3 font-serif text-3xl italic text-[#fff6e8]">
                Start with a chapter, then follow the poems.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#d9ccb7]">
                The table of contents gets you into the right section. The archive on the right holds the full text of every poem in the book collection.
              </p>
            </div>

            <div className="book-panel rounded-[1.8rem] p-5 sm:p-6 xl:sticky xl:top-24">
              <p className="poetry-kicker">Current Poem</p>
              <h2 className="mt-3 font-serif text-2xl italic text-[#fff6e8]">
                {activePoem?.title || "No active poem"}
              </h2>
              <p className="mt-2 text-sm text-[#d9ccb7]">
                {activeCategory?.label || "Archive"} / {activePoem?.type || "Poem"} /{" "}
                {activePoem ? getPoemLocation(activePoem) : "--"}
              </p>
              <div className="mt-4 h-1.5 rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#cfbfa4,#fff1d5)]"
                  animate={{
                    width:
                      activePoemIndex >= 0 && bookPoems.length
                        ? `${((activePoemIndex + 1) / bookPoems.length) * 100}%`
                        : "0%",
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
              <p className="mt-4 text-sm leading-7 text-[#d9ccb7]">
                {activePoem?.blurb || "Choose a poem from the contents to begin reading."}
              </p>
              {activePoem?.audio ? (
                <div className="mt-6 rounded-[1.2rem] border border-white/8 bg-black/10 p-4">
                  <div className="mb-3 flex items-center gap-3 text-[#cfbfa4]">
                    <Headphones size={16} />
                    <p className="poetry-kicker">Listen</p>
                  </div>
                  <audio controls className="w-full">
                    <source src={activePoem.audio} />
                  </audio>
                </div>
              ) : null}
            </div>

            <div className="book-panel rounded-[1.8rem] p-6 sm:p-7">
              <p className="poetry-kicker">Chapter Map</p>
              <div className="mt-5 grid gap-3">
                {categorizedPoems.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => scrollToCategory(category.id)}
                    className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-left transition hover:bg-white/[0.06]"
                  >
                    <p className="poetry-kicker">
                      {category.poems.length} poem{category.poems.length > 1 ? "s" : ""}
                    </p>
                    <h3 className="mt-2 font-serif text-xl italic text-[#fff6e8]">{category.label}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#d9ccb7]">{category.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6" id="poems">
            <div className="book-panel rounded-[2rem] p-6 sm:p-8">
              <p className="poetry-kicker">Full Poems From The Book</p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#d9ccb7] sm:leading-9">
                The complete reading archive lives here, arranged by chapter and shown as native poem cards inside the site.
              </p>
            </div>

            {hasBookResults ? (
              filteredCategories.map((category) => (
                <section
                  key={category.id}
                  id={`category-${category.id}`}
                  className="space-y-4 scroll-mt-28"
                >
                  <div className="book-panel rounded-[1.8rem] p-5 sm:p-6">
                    <p className="poetry-kicker">Category Reading</p>
                    <h2 className="mt-3 font-serif text-3xl italic text-[#fff6e8]">
                      {category.label}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d9ccb7]">
                      {category.description}
                    </p>
                  </div>

                  {category.poems.map((poem) => {
                    const index = bookPoems.findIndex((entry) => entry.id === poem.id);
                    const previousPoem = index > 0 ? bookPoems[index - 1] : null;
                    const nextPoem = index < bookPoems.length - 1 ? bookPoems[index + 1] : null;

                    return (
                      <motion.article
                        key={poem.id}
                        id={`poem-${poem.id}`}
                        data-poem-id={poem.id}
                        initial={false}
                        animate={{
                          borderColor:
                            activePoemId === poem.id
                              ? "rgba(207, 191, 164, 0.28)"
                              : "rgba(201, 186, 161, 0.12)",
                          boxShadow:
                            activePoemId === poem.id
                              ? "0 30px 100px rgba(8, 6, 5, 0.56)"
                              : "0 28px 90px rgba(6, 5, 7, 0.45)",
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="book-panel scroll-mt-24 rounded-[1.8rem] border p-5 sm:p-6"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="poetry-kicker">
                              {category.label} / {poem.type} / {getPoemLocation(poem)}
                            </p>
                            <h3 className="mt-2 font-display text-xl text-[#fff6e8]">{poem.title}</h3>
                          </div>
                          <span className="poetry-kicker rounded-full border border-white/10 px-3 py-1">
                            {activePoemId === poem.id ? "Current" : "Reading"}
                          </span>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-[#d9ccb7]">{poem.blurb}</p>

                        <div className="mt-6 space-y-2 border-t border-white/8 pt-5">
                          {poem.lines.map((line, lineIndex) => (
                            <p key={`${poem.id}-line-${lineIndex}`} className="font-serif text-lg leading-8 text-[#f3ead9]">
                              {line || "\u00A0"}
                            </p>
                          ))}
                        </div>

                        {poem.audio ? (
                          <div className="mt-6 border-t border-white/8 pt-5">
                            <div className="mb-3 flex items-center gap-3 text-[#cfbfa4]">
                              <Headphones size={15} />
                              <p className="poetry-kicker">Listen</p>
                            </div>
                            <audio controls className="w-full">
                              <source src={poem.audio} />
                            </audio>
                          </div>
                        ) : null}

                        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-white/8 pt-5">
                          {previousPoem ? (
                            <button
                              type="button"
                              onClick={() => scrollToPoem(previousPoem.id)}
                              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[#f3ead9] transition hover:bg-white/[0.08]"
                            >
                              Previous Poem
                            </button>
                          ) : (
                            <span className="inline-flex min-h-11 items-center rounded-full border border-white/5 px-4 py-2 text-sm text-[#8f8678]">
                              Beginning
                            </span>
                          )}

                          {nextPoem ? (
                            <button
                              type="button"
                              onClick={() => scrollToPoem(nextPoem.id)}
                              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[#f3ead9] transition hover:bg-white/[0.08]"
                            >
                              Next Poem
                            </button>
                          ) : (
                            <span className="inline-flex min-h-11 items-center rounded-full border border-white/5 px-4 py-2 text-sm text-[#8f8678]">
                              End of Book
                            </span>
                          )}
                        </div>
                      </motion.article>
                    );
                  })}
                </section>
              ))
            ) : (
              <div className="book-panel rounded-[1.8rem] p-6 sm:p-8">
                <p className="poetry-kicker">No Matching Book Poems</p>
                <h2 className="mt-4 font-serif text-3xl italic text-[#fff6e8]">
                  The archive is intact, but this filter found nothing.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[#d9ccb7] sm:leading-9">
                  Try a broader search term and the poems will return.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-4" id="highlights">
          <div className="book-panel rounded-[2rem] p-6 sm:p-8">
            <p className="poetry-kicker">
              {items.length > 0 ? "Added From Dashboard" : "Future Additions"}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#d9ccb7] sm:leading-9">
              {items.length > 0
                ? "New poetry entries created from the admin dashboard appear here automatically as part of the broader public archive."
                : "This shelf is reserved for future poems added from the admin dashboard."}
            </p>
          </div>

          {filteredDashboardPoems.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredDashboardPoems.map((item, index) => (
                <article
                  key={getDashboardItemKey(item, index)}
                  id={`dashboard-poem-${getDashboardItemKey(item, index)}`}
                  className="book-panel scroll-mt-24 rounded-[1.6rem] p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-display text-xl text-[#fff6e8]">{item.title}</h2>
                    <span className="poetry-kicker">{item.type}</span>
                  </div>
                  <p className="mt-4 font-serif text-lg leading-8 text-[#f3ead9]">{item.excerpt}</p>
                  <p className="mt-4 text-sm leading-7 text-[#d9ccb7]">{item.note}</p>
                  {item.audio ? (
                    <div className="mt-5 rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4">
                      <div className="mb-3 flex items-center gap-2 text-[#cfbfa4]">
                        <Headphones size={14} />
                        <p className="poetry-kicker">Listen</p>
                      </div>
                      <audio controls className="w-full">
                        <source src={item.audio} />
                      </audio>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="book-panel rounded-[1.8rem] p-6 sm:p-8">
              <p className="poetry-kicker">Shelf Waiting</p>
              <h2 className="mt-4 font-serif text-3xl italic text-[#fff6e8]">
                More poems will gather here.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#d9ccb7] sm:leading-9">
                Once you add new poetry through the admin dashboard, this section becomes a living archive beyond the main book collection.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.24em] transition ${
        active
          ? "border-[#cfbfa4]/28 bg-white/[0.08] text-[#fff6e8]"
          : "border-white/8 text-[#d9ccb7] hover:bg-white/[0.04]"
      }`}
    >
      {children}
    </button>
  );
}
