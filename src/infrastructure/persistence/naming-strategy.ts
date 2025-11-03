import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';

export class SnakeNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    if (customName) return customName;

    const name =
      embeddedPrefixes.concat(propertyName).join('_') || propertyName;

    return name
      .replace(/(?:([a-z])([A-Z]))|(?:([A-Z]+)([A-Z][a-z]))/g, '$1$4_$2$3')
      .toLowerCase()
      .replace(/^_/, '');
  }
}
