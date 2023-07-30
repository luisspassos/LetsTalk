import { AudioRecordingProvider } from 'contexts/Audio/AudioRecordingContext';
import { RecordAudioButton } from '.';

function click() {
  cy.getBySel('record audio').click();
}

describe('record audio button', () => {
  beforeEach(() => {
    cy.mount(
      <AudioRecordingProvider>
        <RecordAudioButton setIsRecordingAudio={() => {}} />
      </AudioRecordingProvider>
    );
  });

  it('should start recording audio', () => {
    cy.spy(window, 'MediaRecorder').as('record');

    click();

    cy.get('@record').should('be.called');

    cy.get('@record')
      .its('returnValues')
      .then(([{ state }]: [MediaRecorder]) => {
        cy.wrap(state).should('eq', 'recording');
      });
  });

  it("should display an error message if methods aren't supported", () => {
    cy.stub(window.navigator.mediaDevices, 'getUserMedia').value(undefined);

    click();

    cy.get('[id="MethodsDontWorkError"]').should('be.visible');
  });

  describe('should display an unknown error message', () => {
    function stubError(err: string | Error) {
      cy.stub(window.navigator.mediaDevices, 'getUserMedia').callsFake(() => {
        throw err;
      });
    }

    it('default', () => {
      stubError('unknown');

      click();

      cy.get('[id="unknown"]').should('be.visible');
    });

    it('from api', () => {
      const err = new Error();
      err.name = 'UnknownError';

      stubError(err);

      click();

      cy.get('[id="UnknownError"]').should('be.visible');
    });
  });

  it('should display a not allowed error', () => {
    click();

    cy.get('[id="NotAllowedError"]').should('be.visible');
  });
});
