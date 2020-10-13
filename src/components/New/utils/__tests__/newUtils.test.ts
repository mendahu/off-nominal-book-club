import {
  getThumbnail,
  getAuthorString,
  getAuthors,
  getPublishedYear,
  getDescription,
  getTitle,
  getGoogleId,
  getIsbn10,
  getIsbn13,
} from '../newUtils';

const sampleBook = {
  kind: 'books#volume',
  id: '5SyZAAAAQBAJ',
  etag: 'xHj6PYuQZCo',
  selfLink: 'https://www.googleapis.com/books/v1/volumes/5SyZAAAAQBAJ',
  volumeInfo: {
    title: 'Roving Mars',
    subtitle: 'Spirit, Opportunity, and the Exploration of the Red Planet',
    authors: ['Steven Squyres'],
    publisher: 'Hachette Books',
    publishedDate: '2005-08-03',
    description:
      "Steve Squyres is the face and voice of NASA's Mars Exploration Rover mission. Squyres dreamed up the mission in 1987, saw it through from conception in 1995 to a successful landing in 2004, and serves as the principal scientist of its $400 million payload. He has gained a rare inside look at what it took for rovers Spirit and Opportunity to land on the red planet in January 2004--and knows firsthand their findings.",
    industryIdentifiers: [
      {
        type: 'ISBN_10',
        identifier: '140138191X',
      },
      {
        type: 'ISBN_13',
        identifier: '9781401381912',
      },
    ],
    readingModes: {
      text: true,
      image: false,
    },
    pageCount: 434,
    printedPageCount: 316,
    printType: 'BOOK',
    categories: [
      'Science / Space Science',
      'Biography & Autobiography / Personal Memoirs',
    ],
    averageRating: 4,
    ratingsCount: 4,
    maturityRating: 'NOT_MATURE',
    allowAnonLogging: true,
    contentVersion: '1.1.1.0.preview.2',
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false,
    },
    imageLinks: {
      smallThumbnail:
        'http://books.google.com/books/content?id=5SyZAAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71QjJCTChH6TGCH4cBT_l-Pxvun2Qa7R57gIM9r1gl-F9lH722IO4vd79vIJVnTDzJ1mq8Au1fgHq0JgzMy-7WU97j9W6HQuIAnISghr5wbVtGfuwCyg2WfxIwmACJlU01_P8hh&source=gbs_api',
      thumbnail:
        'http://books.google.com/books/content?id=5SyZAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72vbFWx7aT4CwrJ9vt3oFSetluLJ5Q1WHoXEGYEPZZKwT1m0YO92JHM8pcEehh3Td5XJyg0hvvrxN29lCVK3U6breKNp1XWlWq3nxz_ZDWPs55riIKGLqReGA3eUkyvrs2iTGrE&source=gbs_api',
      small:
        'http://books.google.com/books/content?id=5SyZAAAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE73_jTesYeiMqLAg74x_57UNeoHGVJvnZRWY2owUC2WJzOhx91GvkCeiH0uzU3oaLHmY3MSTnvwOV8uyeBR1O71_OoPJXGwNQWIUCNj0Ps37DAaw82IgRKTfklwMFKW6lR1eBpEK&source=gbs_api',
      medium:
        'http://books.google.com/books/content?id=5SyZAAAAQBAJ&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE73ufdM95XKJLA_PRdaCHEs_1y4QloxrLz9O-4FNthDmUxtscBsLgasDkd8OxN2eYlVayaHF21RoW3aYWI07iZkvLTDNikFK8NRX-lfH61V0QZI2xIqp0pu4xG1BS0Wv_6QpTJDw&source=gbs_api',
      large:
        'http://books.google.com/books/content?id=5SyZAAAAQBAJ&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE70tyLG0BxZqbE1WvNvzOEJqzMrB_uT7oeU6ar761AH3tFE-6qQAl7EpF1ctHYjgR7qZGroEcAc5tf4jPHtC7esdC89BEc0Ycxlw_Ki_xF97sWD4fndtvTJ0O5wIdOyQ-K4T7M09&source=gbs_api',
      extraLarge:
        'http://books.google.com/books/content?id=5SyZAAAAQBAJ&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE72Tg0t01mOsZU9lst4KPoDwVdXl2JIoQvGGMOJrKOEfnxn1MLzdy6-QHqf7-Lr6lSTviHhYxfbjWmiJB-Zd8nZXeoqOjaUzCbmM0hJEYRbV26cEyO-Mn-gy9XMe2fjmcMmcAzy_&source=gbs_api',
    },
    language: 'en',
    previewLink:
      'http://books.google.ca/books?id=5SyZAAAAQBAJ&hl=&source=gbs_api',
    infoLink:
      'https://play.google.com/store/books/details?id=5SyZAAAAQBAJ&source=gbs_api',
    canonicalVolumeLink:
      'https://play.google.com/store/books/details?id=5SyZAAAAQBAJ',
  },
  layerInfo: {
    layers: [
      {
        layerId: 'geo',
        volumeAnnotationsVersion: '4',
      },
    ],
  },
  saleInfo: {
    country: 'CA',
    saleability: 'FOR_SALE',
    isEbook: true,
    listPrice: {
      amount: 2.99,
      currencyCode: 'CAD',
    },
    retailPrice: {
      amount: 2.99,
      currencyCode: 'CAD',
    },
    buyLink:
      'https://play.google.com/store/books/details?id=5SyZAAAAQBAJ&rdid=book-5SyZAAAAQBAJ&rdot=1&source=gbs_api',
    offers: [
      {
        finskyOfferType: 1,
        listPrice: {
          amountInMicros: 2990000,
          currencyCode: 'CAD',
        },
        retailPrice: {
          amountInMicros: 2990000,
          currencyCode: 'CAD',
        },
        giftable: true,
      },
    ],
  },
  accessInfo: {
    country: 'CA',
    viewability: 'PARTIAL',
    embeddable: true,
    publicDomain: false,
    textToSpeechPermission: 'ALLOWED',
    epub: {
      isAvailable: true,
      acsTokenLink:
        'http://books.google.ca/books/download/Roving_Mars-sample-epub.acsm?id=5SyZAAAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
    },
    pdf: {
      isAvailable: false,
    },
    webReaderLink:
      'http://play.google.com/books/reader?id=5SyZAAAAQBAJ&hl=&printsec=frontcover&source=gbs_api',
    accessViewStatus: 'SAMPLE',
    quoteSharingAllowed: false,
  },
};

describe('books/new utilities', () => {
  it('should return the right authorString', () => {
    const testBook = { ...sampleBook };
    expect(getAuthorString(testBook)).toEqual('Steven Squyres');
  });

  it('should return No Author is authors doesnt exist', () => {
    const { volumeInfo } = sampleBook;
    const testBook = {
      ...sampleBook,
      volumeInfo: { ...volumeInfo, authors: undefined },
    };
    expect(getAuthorString(testBook)).toEqual('No author');
  });

  it('should return the right thumbnail', () => {
    const testBook = { ...sampleBook };
    expect(getThumbnail(testBook)).toEqual(
      'http://books.google.com/books/content?id=5SyZAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72vbFWx7aT4CwrJ9vt3oFSetluLJ5Q1WHoXEGYEPZZKwT1m0YO92JHM8pcEehh3Td5XJyg0hvvrxN29lCVK3U6breKNp1XWlWq3nxz_ZDWPs55riIKGLqReGA3eUkyvrs2iTGrE&source=gbs_api'
    );
  });

  it('should return a generic book if no url is provided', () => {
    const { volumeInfo } = sampleBook;
    const testBook = {
      ...sampleBook,
      volumeInfo: { ...volumeInfo, imageLinks: undefined },
    };
    expect(getThumbnail(testBook)).toEqual('/generic_book.png');
  });

  it('should return authors array', () => {
    const testBook = { ...sampleBook };
    expect(getAuthors(testBook)).toEqual(['Steven Squyres']);
  });

  it('should return empty array if no authors present', () => {
    const { volumeInfo } = sampleBook;
    const testBook = {
      ...sampleBook,
      volumeInfo: { ...volumeInfo, authors: undefined },
    };
    expect(getAuthors(testBook)).toEqual([]);
  });

  it('should return published year', () => {
    const testBook = { ...sampleBook };
    expect(getPublishedYear(testBook)).toEqual(2005);
  });

  it('should return no published year if none present', () => {
    const { volumeInfo } = sampleBook;
    const testBook = {
      ...sampleBook,
      volumeInfo: { ...volumeInfo, publishedDate: undefined },
    };
    expect(getPublishedYear(testBook)).toEqual('No publication date');
  });

  it('should return description', () => {
    const testBook = { ...sampleBook };
    expect(getDescription(testBook)).toEqual(
      "Steve Squyres is the face and voice of NASA's Mars Exploration Rover mission. Squyres dreamed up the mission in 1987, saw it through from conception in 1995 to a successful landing in 2004, and serves as the principal scientist of its $400 million payload. He has gained a rare inside look at what it took for rovers Spirit and Opportunity to land on the red planet in January 2004--and knows firsthand their findings."
    );
  });

  it('should return no description if none present', () => {
    const { volumeInfo } = sampleBook;
    const testBook = {
      ...sampleBook,
      volumeInfo: { ...volumeInfo, description: undefined },
    };
    expect(getDescription(testBook)).toEqual('No description available');
  });

  it('should return title', () => {
    const testBook = { ...sampleBook };
    expect(getTitle(testBook)).toEqual('Roving Mars');
  });

  it('should return no title if none present', () => {
    const { volumeInfo } = sampleBook;
    const testBook = {
      ...sampleBook,
      volumeInfo: { ...volumeInfo, title: undefined },
    };
    expect(getTitle(testBook)).toEqual('No title');
  });

  it('should return googleId', () => {
    const testBook = { ...sampleBook };
    expect(getGoogleId(testBook)).toEqual('5SyZAAAAQBAJ');
  });

  it('should return isbn10', () => {
    const testBook = { ...sampleBook };
    expect(getIsbn10(testBook)).toEqual('140138191X');
  });

  it('should return no isbn10 none present', () => {
    const { volumeInfo } = sampleBook;
    const testBook = {
      ...sampleBook,
      volumeInfo: {
        ...volumeInfo,
        industryIdentifiers: [
          {
            type: 'ISBN_13',
            identifier: '9781401381912',
          },
        ],
      },
    };
    expect(getIsbn10(testBook)).toEqual(undefined);
  });

  it('should return isbn13', () => {
    const testBook = { ...sampleBook };
    expect(getIsbn13(testBook)).toEqual('9781401381912');
  });

  it('should return no isbn13 none present', () => {
    const { volumeInfo } = sampleBook;
    const testBook = {
      ...sampleBook,
      volumeInfo: {
        ...volumeInfo,
        industryIdentifiers: [
          {
            type: 'ISBN_10',
            identifier: '140138191X',
          },
        ],
      },
    };
    expect(getIsbn13(testBook)).toEqual(undefined);
  });
});
