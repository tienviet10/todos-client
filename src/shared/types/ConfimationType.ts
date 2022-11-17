export interface DescriptionTextType {
  titleText: string;
  displayText: string;
  confirmText: string;
  declineText: string;
}

export type ConfirmationType = ({
  descriptionText,
  onSuccess,
}: {
  descriptionText?: DescriptionTextType;
  onSuccess: () => void;
}) => void;
