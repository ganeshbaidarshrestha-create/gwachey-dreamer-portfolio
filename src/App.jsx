import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import {
  featuredPoemOfTheWeek,
  poetryBookMeta,
  projects as initialProjects,
  poetryBookPoems,
  poetryCards as initialPoetryCards
} from "./lib/content";
import { AboutSection } from "./sections/AboutSection";
import { AdminLoginPage } from "./sections/AdminLoginPage";
import { AdminSection } from "./sections/AdminSection";
import { CaseStudyPage } from "./sections/CaseStudyPage";
import { ContactSection } from "./sections/ContactSection";
import { FeaturedPoemSection } from "./sections/FeaturedPoemSection";
import { Footer } from "./sections/Footer";
import { HeroSection } from "./sections/HeroSection";
import { PhilosophySection } from "./sections/PhilosophySection";
import { PoetryBookPage } from "./sections/PoetryBookPage";
import { PoetrySection } from "./sections/PoetrySection";
import { ProjectsSection } from "./sections/ProjectsSection";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "poetry", label: "Poetry" },
  { id: "contact", label: "Contact" }
];

function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [poetryCards, setPoetryCards] = useState(initialPoetryCards);
  const [page, setPage] = useState("home");
  const [activeCaseStudySlug, setActiveCaseStudySlug] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    () => sessionStorage.getItem("gwachey-admin-auth") === "true",
  );
  const [isLocalAdminAvailable, setIsLocalAdminAvailable] = useState(false);

  useEffect(() => {
    const storedProjects = window.localStorage.getItem("gwachey-projects");
    const storedPoetry = window.localStorage.getItem("gwachey-poetry");

    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }

    if (storedPoetry) {
      setPoetryCards(JSON.parse(storedPoetry));
    }

    const syncAdminVisibility = () => {
      const url = new URL(window.location.href);
      const activePage = (() => {
        const pageParam = url.searchParams.get("page");
        if (pageParam === "poetry-book") return "poetry-book";
        if (pageParam === "case-study") return "case-study";
        if (pageParam === "admin-login") return "admin-login";
        if (pageParam === "admin") return "admin";
        return "home";
      })();
      setActiveCaseStudySlug(url.searchParams.get("slug") || "");
      const hostname = window.location.hostname;
      setIsLocalAdminAvailable(
        hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1",
      );
      setPage(activePage);
    };

    syncAdminVisibility();
    window.addEventListener("hashchange", syncAdminVisibility);
    window.addEventListener("popstate", syncAdminVisibility);
    const handleShortcut = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "g") {
        event.preventDefault();
        navigateToPage("admin-login", { admin: true });
      }
    };
    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("hashchange", syncAdminVisibility);
      window.removeEventListener("popstate", syncAdminVisibility);
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("gwachey-projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    window.localStorage.setItem("gwachey-poetry", JSON.stringify(poetryCards));
  }, [poetryCards]);

  const createProject = (project) => {
    setProjects((current) => [project, ...current]);
  };

  const deleteProject = (title) => {
    setProjects((current) => current.filter((project) => project.title !== title));
  };

  const updateProject = (originalTitle, updatedProject) => {
    setProjects((current) =>
      current.map((project) => (project.title === originalTitle ? updatedProject : project)),
    );
  };

  const createPoetry = (poem) => {
    setPoetryCards((current) => [poem, ...current]);
  };

  const deletePoetry = (title) => {
    setPoetryCards((current) => current.filter((poem) => poem.title !== title));
  };

  const updatePoetry = (originalTitle, updatedPoem) => {
    setPoetryCards((current) =>
      current.map((poem) => (poem.title === originalTitle ? updatedPoem : poem)),
    );
  };

  const replaceProjects = (items) => {
    setProjects(items);
  };

  const replacePoetry = (items) => {
    setPoetryCards(items);
  };

  const navigateToPage = (nextPage, options = {}) => {
    const url = new URL(window.location.href);

    if (nextPage === "home") {
      url.searchParams.delete("page");
      url.searchParams.delete("slug");
    } else {
      url.searchParams.set("page", nextPage);
    }

    if (nextPage !== "case-study") {
      url.searchParams.delete("slug");
    }

    if (options.slug) {
      url.searchParams.set("slug", options.slug);
    }

    if (options.admin) {
      url.searchParams.set("admin", "1");
    } else if (nextPage !== "admin" && nextPage !== "admin-login") {
      url.searchParams.delete("admin");
    }

    window.history.pushState({}, "", url);
    setPage(nextPage);
  };

  const slugify = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const openCaseStudy = (project) => {
    const slug = project.slug || slugify(project.title);
    setActiveCaseStudySlug(slug);
    navigateToPage("case-study", { slug });
  };

  const activeCaseStudy =
    projects.find((project) => (project.slug || slugify(project.title)) === activeCaseStudySlug) ??
    projects[0] ??
    null;
  const canAccessAdmin = isLocalAdminAvailable && isAdminAuthenticated;

  const authenticateAdmin = () => {
    sessionStorage.setItem("gwachey-admin-auth", "true");
    setIsAdminAuthenticated(true);
    navigateToPage("admin", { admin: true });
  };

  const lockAdmin = () => {
    sessionStorage.removeItem("gwachey-admin-auth");
    setIsAdminAuthenticated(false);
    navigateToPage("home");
  };

  return (
    <div className="relative overflow-x-hidden bg-abyss text-mist">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-hero-radial" />
      {page === "poetry-book" ? (
        <PoetryBookPage
          items={poetryCards}
          bookMeta={poetryBookMeta}
          bookPoems={poetryBookPoems}
          onBack={() => navigateToPage("home")}
        />
      ) : page === "case-study" ? (
        activeCaseStudy ? (
          <CaseStudyPage
            project={activeCaseStudy}
            onBack={() => navigateToPage("home")}
            onOpenPoetryBook={() => navigateToPage("poetry-book")}
          />
        ) : (
          <main>
            <HeroSection onOpenPoetryBook={() => navigateToPage("poetry-book")} />
            <ProjectsSection items={projects} onOpenCaseStudy={openCaseStudy} />
          </main>
        )
      ) : page === "admin-login" ? (
        isLocalAdminAvailable ? (
          <AdminLoginPage
            onBack={() => navigateToPage("home")}
            onSuccess={authenticateAdmin}
            isLocalAdminAvailable={isLocalAdminAvailable}
          />
        ) : (
          <AdminLoginPage
            onBack={() => navigateToPage("home")}
            onSuccess={authenticateAdmin}
            isLocalAdminAvailable={isLocalAdminAvailable}
          />
        )
      ) : page === "admin" ? (
        canAccessAdmin ? (
          <AdminSection
            projects={projects}
            poetryCards={poetryCards}
            onCreateProject={createProject}
            onCreatePoetry={createPoetry}
            onUpdateProject={updateProject}
            onUpdatePoetry={updatePoetry}
            onDeleteProject={deleteProject}
            onDeletePoetry={deletePoetry}
            onReplaceProjects={replaceProjects}
            onReplacePoetry={replacePoetry}
            onLock={lockAdmin}
          />
        ) : (
          <AdminLoginPage
            onBack={() => navigateToPage("home")}
            onSuccess={authenticateAdmin}
            isLocalAdminAvailable={isLocalAdminAvailable}
          />
        )
      ) : (
        <>
          <Navbar sections={sections} />
          <main>
            <HeroSection onOpenPoetryBook={() => navigateToPage("poetry-book")} />
            <AboutSection />
            <FeaturedPoemSection
              poem={featuredPoemOfTheWeek}
              onOpenPoetryBook={() => navigateToPage("poetry-book")}
            />
            <ProjectsSection items={projects} onOpenCaseStudy={openCaseStudy} />
            <PoetrySection
              items={poetryCards}
              onOpenPoetryBook={() => navigateToPage("poetry-book")}
            />
            <PhilosophySection />
            <ContactSection />
          </main>
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
