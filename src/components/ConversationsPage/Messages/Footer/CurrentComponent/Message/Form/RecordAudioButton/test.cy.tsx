import { AudioRecordingProvider } from 'contexts/Audio/AudioRecordingContext';
import { RecordAudioButton } from '.';

function click() {
  return cy.getBySel('record audio').as('btn').click();
}

function stubError(err: string | Error) {
  cy.stub(window.navigator.mediaDevices, 'getUserMedia').callsFake(() => {
    throw err;
  });
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

  describe('errors', () => {
    it("should display an error message if methods aren't supported", () => {
      cy.stub(window.navigator.mediaDevices, 'getUserMedia').value(undefined);

      click();

      cy.get('[id="MethodsDontWorkError"]').should('be.visible');
    });

    describe('should display an unknown error message', () => {
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

    it('should display an error message with custom title and message', () => {
      const message = 'custom message';
      const title = 'custom title';

      const err = new Error(message);
      err.name = title;

      stubError(err);

      click();

      cy.contains(message);
      cy.contains(title);
    });

    it('should display a default error message if error has no message', () => {
      const err = new Error();
      err.name = '';

      stubError(err);

      click();

      cy.get('[id="default"]').invoke('text').should('not.be.empty');
    });
  });

  describe('loading', () => {
    // With cypress commands the tests don't work correctly

    let btn: HTMLButtonElement | null;

    beforeEach(() => {
      btn = document.querySelector('[data-testid="record audio"]');

      btn?.click();
    });

    it('should be disabled', () => {
      cy.wrap(btn?.disabled).should('be.true');

      cy.getBySel('record audio').should('not.be.disabled');
    });

    it('should display loading', () => {
      cy.getBySel('loading').should('be.visible');
      cy.getBySel('loading').should('not.exist');
    });
  });

  it('should not start a new audio recording when clicking twice fast', () => {
    cy.spy(window, 'MediaRecorder').as('record');

    click();
    click();

    cy.get('@record').should('be.calledOnce');
  });
});
