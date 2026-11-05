// Lyrics typefaces. Each entry uses a stack so the choice still looks
// distinct when the first family is not installed. Everything here is
// local: no font downloads are made at runtime.
export const LYRICS_FONT_GROUPS = ['Sans serif', 'Serif', 'Display', 'Handwriting', 'Monospace'];

export const LYRICS_FONTS = [
  // Sans serif
  {
    id: 'sans',
    label: 'Sans (default)',
    group: 'Sans serif',
    stack: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
  },
  {
    id: 'inter',
    label: 'Inter',
    group: 'Sans serif',
    stack: '"Inter", "Segoe UI", system-ui, sans-serif',
  },
  {
    id: 'arial',
    label: 'Arial',
    group: 'Sans serif',
    stack: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
  },
  {
    id: 'helvetica',
    label: 'Helvetica',
    group: 'Sans serif',
    stack: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  {
    id: 'segoe',
    label: 'Segoe UI',
    group: 'Sans serif',
    stack: '"Segoe UI", "Segoe UI Variable", system-ui, sans-serif',
  },
  {
    id: 'roboto',
    label: 'Roboto',
    group: 'Sans serif',
    stack: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  {
    id: 'open-sans',
    label: 'Open Sans',
    group: 'Sans serif',
    stack: '"Open Sans", "Segoe UI", sans-serif',
  },
  {
    id: 'lato',
    label: 'Lato',
    group: 'Sans serif',
    stack: 'Lato, "Segoe UI", sans-serif',
  },
  {
    id: 'montserrat',
    label: 'Montserrat',
    group: 'Sans serif',
    stack: 'Montserrat, "Segoe UI", sans-serif',
  },
  {
    id: 'poppins',
    label: 'Poppins',
    group: 'Sans serif',
    stack: 'Poppins, "Segoe UI", sans-serif',
  },
  {
    id: 'nunito',
    label: 'Nunito',
    group: 'Sans serif',
    stack: 'Nunito, "Segoe UI", sans-serif',
  },
  {
    id: 'raleway',
    label: 'Raleway',
    group: 'Sans serif',
    stack: 'Raleway, "Segoe UI", sans-serif',
  },
  {
    id: 'work-sans',
    label: 'Work Sans',
    group: 'Sans serif',
    stack: '"Work Sans", "Segoe UI", sans-serif',
  },
  {
    id: 'dm-sans',
    label: 'DM Sans',
    group: 'Sans serif',
    stack: '"DM Sans", "Segoe UI", sans-serif',
  },
  {
    id: 'space-grotesk',
    label: 'Space Grotesk',
    group: 'Sans serif',
    stack: '"Space Grotesk", "Segoe UI", sans-serif',
  },
  {
    id: 'source-sans',
    label: 'Source Sans',
    group: 'Sans serif',
    stack: '"Source Sans 3", "Source Sans Pro", "Segoe UI", sans-serif',
  },
  {
    id: 'futura',
    label: 'Futura',
    group: 'Sans serif',
    stack: 'Futura, "Century Gothic", "URW Gothic", sans-serif',
  },
  {
    id: 'century-gothic',
    label: 'Century Gothic',
    group: 'Sans serif',
    stack: '"Century Gothic", "URW Gothic", "Avant Garde", sans-serif',
  },
  {
    id: 'avant-garde',
    label: 'Avant Garde',
    group: 'Sans serif',
    stack: '"ITC Avant Garde Gothic", "Avant Garde", "Century Gothic", sans-serif',
  },
  {
    id: 'optima',
    label: 'Optima',
    group: 'Sans serif',
    stack: 'Optima, Candara, "Segoe UI", sans-serif',
  },
  {
    id: 'candara',
    label: 'Candara',
    group: 'Sans serif',
    stack: 'Candara, Optima, "Segoe UI", sans-serif',
  },
  {
    id: 'gill-sans',
    label: 'Gill Sans',
    group: 'Sans serif',
    stack: '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
  },
  {
    id: 'calibri',
    label: 'Calibri',
    group: 'Sans serif',
    stack: 'Calibri, Carlito, "Segoe UI", sans-serif',
  },
  {
    id: 'trebuchet',
    label: 'Trebuchet MS',
    group: 'Sans serif',
    stack: '"Trebuchet MS", "Segoe UI", sans-serif',
  },
  {
    id: 'verdana',
    label: 'Verdana',
    group: 'Sans serif',
    stack: 'Verdana, Geneva, sans-serif',
  },
  {
    id: 'tahoma',
    label: 'Tahoma',
    group: 'Sans serif',
    stack: 'Tahoma, Verdana, sans-serif',
  },
  {
    id: 'franklin',
    label: 'Franklin Gothic',
    group: 'Sans serif',
    stack: '"Franklin Gothic Medium", "Franklin Gothic", "Arial Narrow", sans-serif',
  },
  {
    id: 'ubuntu',
    label: 'Ubuntu',
    group: 'Sans serif',
    stack: 'Ubuntu, "Ubuntu Sans", "Segoe UI", sans-serif',
  },
  {
    id: 'noto-sans',
    label: 'Noto Sans',
    group: 'Sans serif',
    stack: '"Noto Sans", "Segoe UI", sans-serif',
  },
  {
    id: 'dejavu-sans',
    label: 'DejaVu Sans',
    group: 'Sans serif',
    stack: '"DejaVu Sans", Verdana, sans-serif',
  },
  {
    id: 'liberation-sans',
    label: 'Liberation Sans',
    group: 'Sans serif',
    stack: '"Liberation Sans", Arial, sans-serif',
  },
  {
    id: 'nimbus-sans',
    label: 'Nimbus Sans',
    group: 'Sans serif',
    stack: '"Nimbus Sans", Helvetica, sans-serif',
  },

  // Serif
  {
    id: 'serif',
    label: 'Serif (default)',
    group: 'Serif',
    stack: 'Georgia, "Times New Roman", Cambria, serif',
  },
  {
    id: 'georgia',
    label: 'Georgia',
    group: 'Serif',
    stack: 'Georgia, "Times New Roman", serif',
  },
  {
    id: 'times',
    label: 'Times New Roman',
    group: 'Serif',
    stack: '"Times New Roman", Times, serif',
  },
  {
    id: 'garamond',
    label: 'Garamond',
    group: 'Serif',
    stack: '"EB Garamond", Garamond, "Cormorant Garamond", serif',
  },
  {
    id: 'palatino',
    label: 'Palatino',
    group: 'Serif',
    stack: '"Palatino Linotype", Palatino, "Book Antiqua", serif',
  },
  {
    id: 'book-antiqua',
    label: 'Book Antiqua',
    group: 'Serif',
    stack: '"Book Antiqua", Palatino, "Palatino Linotype", serif',
  },
  {
    id: 'baskerville',
    label: 'Baskerville',
    group: 'Serif',
    stack: 'Baskerville, "Libre Baskerville", "Baskerville Old Face", serif',
  },
  {
    id: 'libre-baskerville',
    label: 'Libre Baskerville',
    group: 'Serif',
    stack: '"Libre Baskerville", Baskerville, Georgia, serif',
  },
  {
    id: 'didot',
    label: 'Didot',
    group: 'Serif',
    stack: 'Didot, "Bodoni 72", "Bodoni MT", "Times New Roman", serif',
  },
  {
    id: 'bodoni',
    label: 'Bodoni',
    group: 'Serif',
    stack: '"Bodoni 72", "Bodoni MT", Didot, serif',
  },
  {
    id: 'cambria',
    label: 'Cambria',
    group: 'Serif',
    stack: 'Cambria, Georgia, serif',
  },
  {
    id: 'constantia',
    label: 'Constantia',
    group: 'Serif',
    stack: 'Constantia, Cambria, Georgia, serif',
  },
  {
    id: 'bookman',
    label: 'Bookman',
    group: 'Serif',
    stack: '"Bookman Old Style", "URW Bookman", Bookman, serif',
  },
  {
    id: 'century-schoolbook',
    label: 'Century Schoolbook',
    group: 'Serif',
    stack: '"Century Schoolbook", "New Century Schoolbook", C059, serif',
  },
  {
    id: 'charter',
    label: 'Charter',
    group: 'Serif',
    stack: 'Charter, "Bitstream Charter", "Iowan Old Style", Georgia, serif',
  },
  {
    id: 'merriweather',
    label: 'Merriweather',
    group: 'Serif',
    stack: 'Merriweather, Georgia, serif',
  },
  {
    id: 'playfair',
    label: 'Playfair Display',
    group: 'Serif',
    stack: '"Playfair Display", Didot, Georgia, serif',
  },
  {
    id: 'lora',
    label: 'Lora',
    group: 'Serif',
    stack: 'Lora, Georgia, serif',
  },
  {
    id: 'cormorant',
    label: 'Cormorant Garamond',
    group: 'Serif',
    stack: '"Cormorant Garamond", Garamond, Georgia, serif',
  },
  {
    id: 'crimson',
    label: 'Crimson Text',
    group: 'Serif',
    stack: '"Crimson Text", "Crimson Pro", Georgia, serif',
  },
  {
    id: 'noto-serif',
    label: 'Noto Serif',
    group: 'Serif',
    stack: '"Noto Serif", Georgia, serif',
  },
  {
    id: 'dejavu-serif',
    label: 'DejaVu Serif',
    group: 'Serif',
    stack: '"DejaVu Serif", Georgia, serif',
  },
  {
    id: 'liberation-serif',
    label: 'Liberation Serif',
    group: 'Serif',
    stack: '"Liberation Serif", "Times New Roman", serif',
  },
  {
    id: 'nimbus-roman',
    label: 'Nimbus Roman',
    group: 'Serif',
    stack: '"Nimbus Roman", "Times New Roman", serif',
  },
  {
    id: 'p052',
    label: 'P052',
    group: 'Serif',
    stack: 'P052, Palatino, serif',
  },

  // Display
  {
    id: 'impact',
    label: 'Impact',
    group: 'Display',
    stack: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
  },
  {
    id: 'arial-black',
    label: 'Arial Black',
    group: 'Display',
    stack: '"Arial Black", "Arial Bold", Gadget, sans-serif',
  },
  {
    id: 'copperplate',
    label: 'Copperplate',
    group: 'Display',
    stack: 'Copperplate, "Copperplate Gothic Light", fantasy',
  },
  {
    id: 'rockwell',
    label: 'Rockwell',
    group: 'Display',
    stack: 'Rockwell, "Roboto Slab", "Courier New", serif',
  },
  {
    id: 'oswald',
    label: 'Oswald',
    group: 'Display',
    stack: 'Oswald, Impact, sans-serif',
  },
  {
    id: 'bebas',
    label: 'Bebas Neue',
    group: 'Display',
    stack: '"Bebas Neue", Impact, sans-serif',
  },
  {
    id: 'abril',
    label: 'Abril Fatface',
    group: 'Display',
    stack: '"Abril Fatface", Georgia, serif',
  },
  {
    id: 'stencil',
    label: 'Stencil',
    group: 'Display',
    stack: 'Stencil, "Arial Black", fantasy',
  },

  // Handwriting
  {
    id: 'comic-sans',
    label: 'Comic Sans',
    group: 'Handwriting',
    stack: '"Comic Sans MS", "Comic Neue", cursive',
  },
  {
    id: 'comic-neue',
    label: 'Comic Neue',
    group: 'Handwriting',
    stack: '"Comic Neue", "Comic Sans MS", cursive',
  },
  {
    id: 'brush-script',
    label: 'Brush Script',
    group: 'Handwriting',
    stack: '"Brush Script MT", "Segoe Script", cursive',
  },
  {
    id: 'segoe-script',
    label: 'Segoe Script',
    group: 'Handwriting',
    stack: '"Segoe Script", "Bradley Hand", cursive',
  },
  {
    id: 'bradley-hand',
    label: 'Bradley Hand',
    group: 'Handwriting',
    stack: '"Bradley Hand", "Segoe Script", cursive',
  },
  {
    id: 'papyrus',
    label: 'Papyrus',
    group: 'Handwriting',
    stack: 'Papyrus, fantasy',
  },
  {
    id: 'caveat',
    label: 'Caveat',
    group: 'Handwriting',
    stack: 'Caveat, "Comic Sans MS", cursive',
  },
  {
    id: 'pacifico',
    label: 'Pacifico',
    group: 'Handwriting',
    stack: 'Pacifico, "Brush Script MT", cursive',
  },
  {
    id: 'dancing-script',
    label: 'Dancing Script',
    group: 'Handwriting',
    stack: '"Dancing Script", "Brush Script MT", cursive',
  },
  {
    id: 'great-vibes',
    label: 'Great Vibes',
    group: 'Handwriting',
    stack: '"Great Vibes", "Brush Script MT", cursive',
  },
  {
    id: 'satisfy',
    label: 'Satisfy',
    group: 'Handwriting',
    stack: 'Satisfy, "Brush Script MT", cursive',
  },

  // Monospace
  {
    id: 'mono',
    label: 'Mono (default)',
    group: 'Monospace',
    stack: '"SFMono-Regular", "Cascadia Code", Consolas, monospace',
  },
  {
    id: 'consolas',
    label: 'Consolas',
    group: 'Monospace',
    stack: 'Consolas, "Cascadia Mono", "Courier New", monospace',
  },
  {
    id: 'courier',
    label: 'Courier New',
    group: 'Monospace',
    stack: '"Courier New", Courier, monospace',
  },
  {
    id: 'menlo',
    label: 'Menlo',
    group: 'Monospace',
    stack: 'Menlo, Monaco, "SFMono-Regular", monospace',
  },
  {
    id: 'sf-mono',
    label: 'SF Mono',
    group: 'Monospace',
    stack: '"SF Mono", "SFMono-Regular", Menlo, monospace',
  },
  {
    id: 'fira-code',
    label: 'Fira Code',
    group: 'Monospace',
    stack: '"Fira Code", "Fira Mono", monospace',
  },
  {
    id: 'jetbrains-mono',
    label: 'JetBrains Mono',
    group: 'Monospace',
    stack: '"JetBrains Mono", "JetBrains Mono NL", monospace',
  },
  {
    id: 'ibm-plex-mono',
    label: 'IBM Plex Mono',
    group: 'Monospace',
    stack: '"IBM Plex Mono", "Courier New", monospace',
  },
  {
    id: 'source-code',
    label: 'Source Code Pro',
    group: 'Monospace',
    stack: '"Source Code Pro", Consolas, monospace',
  },
  {
    id: 'ubuntu-mono',
    label: 'Ubuntu Mono',
    group: 'Monospace',
    stack: '"Ubuntu Mono", "DejaVu Sans Mono", monospace',
  },
  {
    id: 'noto-mono',
    label: 'Noto Sans Mono',
    group: 'Monospace',
    stack: '"Noto Sans Mono", "DejaVu Sans Mono", monospace',
  },
  {
    id: 'dejavu-mono',
    label: 'DejaVu Sans Mono',
    group: 'Monospace',
    stack: '"DejaVu Sans Mono", Menlo, monospace',
  },
  {
    id: 'liberation-mono',
    label: 'Liberation Mono',
    group: 'Monospace',
    stack: '"Liberation Mono", "Courier New", monospace',
  },
  {
    id: 'nimbus-mono',
    label: 'Nimbus Mono',
    group: 'Monospace',
    stack: '"Nimbus Mono PS", "Courier New", monospace',
  },
];

const FONT_BY_ID = new Map(LYRICS_FONTS.map((font) => [font.id, font]));

export const LYRICS_FONT_IDS = LYRICS_FONTS.map((font) => font.id);

export function lyricsFontStack(id) {
  return (FONT_BY_ID.get(id) ?? LYRICS_FONTS[0]).stack;
}
