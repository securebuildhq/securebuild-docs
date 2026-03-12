import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DocsH1, DocsH2, DocsH3, DocsP, DocsUL, DocsLI } from "@/components/docs/typography"

export default function CodeOfConductPage() {
  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">Code of Conduct</span>
      </div>

      <DocsH1>Contributor Covenant Code of Conduct</DocsH1>

      <DocsH2 id="our-pledge">Our Pledge</DocsH2>
      <DocsP>
        We as members, contributors, and leaders pledge to make participation in our
        community a harassment-free experience for everyone, regardless of age, body
        size, visible or invisible disability, ethnicity, sex characteristics, gender
        identity and expression, level of experience, education, socio-economic status,
        nationality, personal appearance, race, caste, color, religion, or sexual
        identity and orientation.
      </DocsP>
      <DocsP>
        We pledge to act and interact in ways that contribute to an open, welcoming,
        diverse, inclusive, and healthy community.
      </DocsP>

      <DocsH2 id="our-standards">Our Standards</DocsH2>
      <DocsP>
        Examples of behavior that contributes to a positive environment for our community
        include:
      </DocsP>
      <DocsUL>
        <DocsLI>Focusing on what is best not just for us as individuals, but for the overall community</DocsLI>
        <DocsLI>Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience</DocsLI>
        <DocsLI>Giving and gracefully accepting constructive feedback</DocsLI>
        <DocsLI>Being respectful of differing opinions, viewpoints, and experiences</DocsLI>
        <DocsLI>Demonstrating empathy and kindness toward other people</DocsLI>
      </DocsUL>
      <DocsP>
        Examples of unacceptable behavior include:
      </DocsP>
      <DocsUL>
        <DocsLI>The use of sexualized language or imagery, and sexual attention or advances of any kind</DocsLI>
        <DocsLI>Trolling, insulting or derogatory comments, and personal or political attacks</DocsLI>
        <DocsLI>Public or private harassment</DocsLI>
        <DocsLI>Publishing others&apos; private information, such as a physical or email address, without their explicit permission</DocsLI>
        <DocsLI>Other conduct which could reasonably be considered inappropriate in a professional setting</DocsLI>
      </DocsUL>

      <DocsH2 id="enforcement-responsibilities">Enforcement Responsibilities</DocsH2>
      <DocsP>
        Community leaders are responsible for clarifying and enforcing our standards of
        acceptable behavior and will take appropriate and fair corrective action in
        response to any behavior that they deem inappropriate, threatening, offensive, or
        harmful.
      </DocsP>
      <DocsP>
        Community leaders have the right and responsibility to remove, edit, or reject
        comments, commits, code, wiki edits, issues, and other contributions that are
        not aligned to this Code of Conduct, and will communicate reasons for moderation
        decisions when appropriate.
      </DocsP>

      <DocsH2 id="scope">Scope</DocsH2>
      <DocsP>
        This Code of Conduct applies within all community spaces, and also applies when
        an individual is officially representing the community in public spaces.
        Examples of representing our community include using an official e-mail address,
        posting via an official social media account, or acting as an appointed
        representative at an online or offline event.
      </DocsP>

      <DocsH2 id="enforcement">Enforcement</DocsH2>
      <DocsP>
        Instances of abusive, harassing, or otherwise unacceptable behavior may be reported
        to the community leaders responsible for enforcement. To report, open an issue or
        discussion in this repository (you may use a private security advisory if you
        prefer confidentiality), or contact the{" "}
        <a href="https://github.com/orgs/securebuildhq/teams/core" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@securebuildhq/core</a>{" "}
        team. All complaints will be reviewed and investigated promptly and fairly.
      </DocsP>
      <DocsP>
        All community leaders are obligated to respect the privacy and security of the
        reporter of any incident.
      </DocsP>

      <DocsH2 id="enforcement-guidelines">Enforcement Guidelines</DocsH2>
      <DocsP>
        Community leaders will follow these Community Impact Guidelines in determining
        the consequences for any action they deem in violation of this Code of Conduct:
      </DocsP>

      <DocsH3>1. Correction</DocsH3>
      <DocsP>
        <strong>Community Impact:</strong> Use of inappropriate language or other
        behavior deemed unprofessional or unwelcome in the community.
      </DocsP>
      <DocsP>
        <strong>Consequence:</strong> A private, written warning from community leaders,
        providing clarity around the nature of the violation and an explanation of why
        the behavior was inappropriate. A public apology may be requested.
      </DocsP>

      <DocsH3>2. Warning</DocsH3>
      <DocsP>
        <strong>Community Impact:</strong> A violation through a single incident or
        series of actions.
      </DocsP>
      <DocsP>
        <strong>Consequence:</strong> A warning with consequences for continued
        behavior. No interaction with the people involved, including unsolicited
        interaction with those enforcing the Code of Conduct, for a specified period of
        time. This includes avoiding interactions in community spaces as well as
        external channels like social media. Violating these terms may lead to a
        temporary or permanent ban.
      </DocsP>

      <DocsH3>3. Temporary Ban</DocsH3>
      <DocsP>
        <strong>Community Impact:</strong> A serious violation of community standards,
        including sustained inappropriate behavior.
      </DocsP>
      <DocsP>
        <strong>Consequence:</strong> A temporary ban from any sort of interaction or
        public communication with the community for a specified period of time. No
        public or private interaction with the people involved, including unsolicited
        interaction with those enforcing the Code of Conduct, is allowed during this
        period. Violating these terms may lead to a permanent ban.
      </DocsP>

      <DocsH3>4. Permanent Ban</DocsH3>
      <DocsP>
        <strong>Community Impact:</strong> Demonstrating a pattern of violation of
        community standards, including sustained inappropriate behavior, harassment of an
        individual, or aggression toward or disparagement of classes of individuals.
      </DocsP>
      <DocsP>
        <strong>Consequence:</strong> A permanent ban from any sort of public interaction
        within the community.
      </DocsP>

      <DocsH2 id="attribution">Attribution</DocsH2>
      <DocsP>
        This Code of Conduct is adapted from the{" "}
        <a href="https://www.contributor-covenant.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Contributor Covenant</a>, version 2.1, available at{" "}
        <a href="https://www.contributor-covenant.org/version/2/1/code_of_conduct.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">contributor-covenant.org/version/2/1/code_of_conduct.html</a>.
      </DocsP>
      <DocsP>
        Community Impact Guidelines were inspired by{" "}
        <a href="https://github.com/mozilla/diversity" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla&apos;s code of conduct enforcement ladder</a>.
      </DocsP>
      <DocsP>
        For answers to common questions about this code of conduct, see the FAQ at{" "}
        <a href="https://www.contributor-covenant.org/faq" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">contributor-covenant.org/faq</a>. Translations are available at{" "}
        <a href="https://www.contributor-covenant.org/translations" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">contributor-covenant.org/translations</a>.
      </DocsP>

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link
          href="/docs/development"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Development Setup
        </Link>
        <Link
          href="/docs"
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Docs
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
