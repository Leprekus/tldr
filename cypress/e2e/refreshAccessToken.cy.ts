import refreshAccessToken from '../../utils/refreshAccessToken';

describe('refreshAccessToken', () => {
  it('should refresh an expired token', async () => {
    const expiredToken = {
      accessToken: 'expired_access_token',
      accessTokenExpires: Date.now() - 1000,
      refreshToken: 'refresh_token',
      account: {
        clientId: 'client_id',
        clientSecret: 'client_secret',
        refreshToken: 'refresh_token',
      },
    };

    // Stub the fetch request to return a new token
    cy.stub(window, 'fetch')
      .withArgs('https://www.reddit.com/api/v1/access_token')
      .returns(
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              access_token: 'new_access_token',
              expires_in: 3600,
              refresh_token: 'new_refresh_token',
              scope: '*',
              token_type: 'bearer',
            }),
        })
      );

    const refreshedToken = await refreshAccessToken(expiredToken);

    // Check that the refreshed token has been updated
    expect(refreshedToken.accessToken).to.equal('new_access_token');
    expect(refreshedToken.accessTokenExpires).to.be.a('number');
    expect(refreshedToken.refreshToken).to.equal('new_refresh_token');
  });

  it('should return the same token if it has not expired', async () => {
    const token = {
      accessToken: 'access_token',
      accessTokenExpires: Date.now() + 3600 * 1000,
      refreshToken: 'refresh_token',
      account: {
        clientId: 'client_id',
        clientSecret: 'client_secret',
        refreshToken: 'refresh_token',
      },
    };

    // Stub the fetch request to fail if called
    //cy.stub(window, 'fetch').throws(new Error('Unexpected fetch call'));

    const refreshedToken = await refreshAccessToken(token);

    // Check that the token has not been updated
    expect(refreshedToken.accessToken).to.equal(token.accessToken);
    expect(refreshedToken.accessTokenExpires).to.equal(
      token.accessTokenExpires
    );
    expect(refreshedToken.refreshToken).to.equal(token.refreshToken);
  });

  it('should throw an error if request fails', async () => {
    // Arrange
    const token = {
      accessToken: 'access_token',
      accessTokenExpires: Date.now() - 3600,
      refreshToken: 'refresh_token',
      account: {
        clientId: 'client_id',
        clientSecret: 'client_secret',
        refresh_token: 'refresh_token',
      },
    };

    cy.intercept(
      'POST',
      'https://www.reddit.com/api/v1/access_token',
      (req) => {
        req.reply({
          statusCode: 500,
          body: 'Internal Server Error',
        });
      }
    );

    // Act
    const result = await refreshAccessToken(token);

    // Assert
    expect(result.error).to.equal('refreshAccessTokenError');
  });
});
