import { ValidationRenderer, RenderInstruction, ValidationError } from 'aurelia-validation';
import { LogManager } from 'aurelia-framework';

const logger = LogManager.getLogger('bootstrap-form-validation-renderer'); 

export class BootstrapFormValidationRenderer {
  render(instruction: RenderInstruction) {
    for (let { error, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, error);
      }
    }

    for (let { error, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, error);
      }
    }
  }

  private add(element, error) {
    logger.debug('add', element, error);
    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    // add the has-error class to the enclosing form-group div
    formGroup.classList.add('has-error');

    // add help-block
    const message = document.createElement('span');
    message.className = 'col-sm-offset-2 col-sm-10 help-block validation-message';
    message.textContent = error.message;
    message.id = `validation-message-${error.id}`;
    formGroup.appendChild(message);
  }

  private remove(element, error) {
    logger.debug('remove', element, error);
    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    // remove help-block
    const message = formGroup.querySelector(`#validation-message-${error.id}`);
    if (message) {
      formGroup.removeChild(message);

      // remove the has-error class from the enclosing form-group div
      if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
        formGroup.classList.remove('has-error');
      }
    }
  }
}

(function (ELEMENT) {
	ELEMENT.matches = ELEMENT.matches || ELEMENT.msMatchesSelector || ELEMENT.webkitMatchesSelector;

	ELEMENT.closest = ELEMENT.closest || function closest(selector) {
		var element = this;

		while (element) {
			if (element.matches(selector)) {
				break;
			}

			element = element.parentElement;
		}

		return element;
	};
}(Element.prototype));
