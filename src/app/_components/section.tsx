"use client";

import { ReactNode, createContext, useContext } from "react";

/** Context type that represents the current section nesting level. */
interface SectionLevelContext {
  /** The current section nesting level. */
  readonly level: number;
}

/** Context that represents the current section nesting level. */
export const SectionLevelContext = createContext<SectionLevelContext>({
  level: 0,
});

export interface SectionProperties {
  title: ReactNode;
  children?: ReactNode | undefined;
  /** ClassName of the whole section, including the title. */
  className?: string | undefined;
  /** ClassName of contents, excluding the title. */
  contentClassName?: string | undefined;
}

/**
 * A section with a title, which dynamically determines the nesting level using
 * context.
 * @param properties - Properties of the section.
 * @returns The section component.
 */
export default function Section(properties: SectionProperties) {
  const { level } = useContext(SectionLevelContext);

  return (
    <section className={properties.className ?? "contents"}>
      {level === 0 && (
        <h1 className="text-center text-2xl">{properties.title}</h1>
      )}
      {level === 1 && (
        <h2 className="text-center text-xl">{properties.title}</h2>
      )}
      {level === 2 && (
        <h3 className="text-center text-lg">{properties.title}</h3>
      )}
      {level === 3 && <h4 className="text-center">{properties.title}</h4>}
      {level === 4 && <h5 className="text-center">{properties.title}</h5>}
      {level === 5 && <h6 className="text-center">{properties.title}</h6>}
      {level > 5 && <div className="text-center">{properties.title}</div>}
      <SectionLevelContext.Provider value={{ level: level + 1 }}>
        <div className={properties.contentClassName ?? "contents"}>
          {properties.children}
        </div>
      </SectionLevelContext.Provider>
    </section>
  );
}
