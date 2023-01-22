class TutorNoteSerializer < ActiveModel::Serializer
  attributes :id, :tutor_id, :tutor_note, :tutor_name, :tutee_name

  def tutor_name
    object.tutor.full_name
  end

  def tutee_name
    object.tutee.full_name
  end
  def tutor_note
    object.note
  end
end
