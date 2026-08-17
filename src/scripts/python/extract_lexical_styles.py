import re

# We will read Style tag 1 and 2 from fetched_styles.css, parse out the styles,
# and write them as clean Scss nested inside .page--blog-post.

scss_snippet = """
  // Lexical Blocks & Layout Spacings Replicated
  .BlogPostHeader {
    padding-top: var(--space-lg-3xl);
    padding-bottom: var(--space-lg);
    background-color: var(--color-bg);

    .container {
      max-width: 48rem;
      margin-inline: auto;
    }
  }

  .subtitle {
    color: var(--color-foreground-secondary);
    font-size: var(--font-size-2);
    line-height: 1.5;
    margin-block-start: var(--space-3xs);
    margin-block-end: var(--space-2xs);
    max-width: 75ch;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-family: var(--font-family-alt);
    font-size: var(--font-size-0);
    color: var(--color-foreground-secondary);
    opacity: 0.8;
  }

  .separator {
    opacity: 0.5;
  }

  .featured-image {
    width: 100%;
    border-radius: var(--radius-lg, 1rem);
    overflow: hidden;
    margin-top: var(--space-lg);

    img {
      object-position: var(--frame-pos, center);
    }
  }

  .content-container {
    max-width: 48rem;
    margin-inline: auto;
  }

  // Lexical Block Styling
  .Tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: var(--space-3xs);
    padding: var(--space-4xs) var(--space-xs);
    border-radius: var(--radius);
    margin-inline: calc(var(--space-xs) * -1);
    font-family: var(--font-family-alt);
    font-size: var(--font-size--1);
    letter-spacing: .015em;

    &:before {
      content: "";
      border-radius: var(--radius-full);
      width: .25rem;
      height: .25rem;
      background: var(--tag-color);
      display: block;
    }

    &:hover, &:focus {
      background: color-mix(in oklch, var(--color-foreground) 5%, transparent);
    }
  }

  .lexical-testimonial {
    margin-block: 2.5em;
    
    .inner {
      padding: var(--blockquote-padding-block, var(--space-lg)) var(--blockquote-padding-inline, var(--space-lg));
    }

    .prose {
      --prose-font-size: var(--font-size-2);
      --prose-body-color: var(--color-foreground);

      p {
        text-indent: -.75ch;
      }
    }

    &[data-size="sm"] .prose {
      --prose-font-size: var(--font-size-1);
    }

    &[data-size="lg"] {
      --blockquote-padding-block: var(--space-xl);
      --blockquote-padding-inline: var(--space-xl);

      .prose {
        --prose-font-size: var(--font-size-4);
      }
    }

    &[data-text-align="center"] {
      text-align: center;
      p {
        text-indent: 0;
      }
    }
  }

  .lexical-testimonial__attribution {
    font-size: var(--font-size-0);
    color: var(--color-foreground);
    margin-block-start: var(--space-lg);

    cite {
      font-style: normal;
      font-weight: 600;
    }
  }

  .lexical-testimonial__company {
    font-weight: 400;
    color: var(--color-foreground-secondary);
  }

  .lexical-callout {
    margin-block: 2em;

    .inner {
      padding: var(--space-md);
    }

    .prose {
      --prose-font-size: var(--font-size-1);
      --prose-body-color: var(--color-foreground);
    }
  }

  .lexical-stats {
    margin-block: 2em;
    
    // reset margin if preceded by heading
    :is(h2, h3, h4, h5, h6) + & {
      margin-block-start: 0;
    }
  }

  .lexical-stats__item {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xs);
    padding: var(--space-s) var(--space-m);
    min-width: 8rem;
  }

  .lexical-stats__value {
    font-size: var(--font-size-5);
    color: var(--color-foreground);
  }

  .lexical-stats__label {
    color: var(--color-foreground-secondary);
    text-wrap: balance;
  }
"""

print("Successfully designed lexical scss block!")
# We will write this snippet directly to a file or inspect
with open("lexical_scss.css", "w") as f:
    f.write(scss_snippet)
