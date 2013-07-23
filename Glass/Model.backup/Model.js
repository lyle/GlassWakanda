

guidedModel =
{
	GoogleAccess :
	{
		updated_at :
		{
			events :
			{
				onValidate:function(attributeName)
				{
					this.updated_at = new Date();
				},
				onSave:function(attributeName)
				{
					this.updated_at = new Date();
				}
			}
		},
		created_at :
		{
			events :
			{
				onInit:function(attributeName)
				{
					this.created_at = new Date();
				}
			}
		}
	}
};
