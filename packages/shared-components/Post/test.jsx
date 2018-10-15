import getFormattedSourceUrl from './sourceUrl';

describe('Formatted SourceUrl', () => {
  it('should not include subdomain www. in domain name', () => {
    const url = 'https://www.npr.org/books/';
    const formattedUrl = getFormattedSourceUrl(url);
    expect(formattedUrl).toEqual('npr.org');
  });
  it('should not include subdomain www2 in domain name', () => {
    const url = 'https://www2.npr.org/books/';
    const formattedUrl = getFormattedSourceUrl(url);
    expect(formattedUrl).toEqual('npr.org');
  });
  it('should include second subdomain in domain name', () => {
    const url = 'https://www.npr.help.org/';
    const formattedUrl = getFormattedSourceUrl(url);
    expect(formattedUrl).toEqual('npr.help.org');
  });
  it('should format url without https', () => {
    const url = 'www.npr.org/books/';
    const formattedUrl = getFormattedSourceUrl(url);
    expect(formattedUrl).toEqual('npr.org');
  });
  it('should format url without subdomain', () => {
    const url = 'https://npr.org/books/';
    const formattedUrl = getFormattedSourceUrl(url);
    expect(formattedUrl).toEqual('npr.org');
  });
});
