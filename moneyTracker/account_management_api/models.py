from django.db import models
from django.utils.translation import gettext as _
# Create your models here.

class Account(models.Model):
    user_id = models.ForeignKey("auth.User", verbose_name=_("Owner"), on_delete=models.CASCADE)
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(_("Description"), null=True, blank=True)
    balance = models.FloatField(_("Balance"), default=0)
    show_card = models.BooleanField(_("Show Card"), default=False)
    show_pie = models.BooleanField(_("Show Pie Chart"), default=False)
    show_line = models.BooleanField(_("Show in Line Chart"), default=False)
    theme_color_hash = models.CharField(_("Theme Color"), max_length=7, null=True, blank=True, unique=True)
    theme_icon_fa_class = models.CharField(_("Theme Icon FA class"), max_length=50, null =True)

    SAVINGS = "SVG"
    CHECKING = "CHK"
    INVESTMENT = "INV"
    ACCOUNT_TYPE_CHOICE = {
        (SAVINGS, "Savings"),
        (CHECKING, "Checking"),
        (INVESTMENT, "Investment"),
    }
    account_type = models.CharField(
        max_length=3,
        choices= ACCOUNT_TYPE_CHOICE ,
        default=CHECKING,
    )

    def __str__(self):
        return self.name
    

class Category(models.Model):
    user_id = models.ForeignKey("auth.User", verbose_name=_("Owner"), on_delete=models.CASCADE)
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(_("Description"), null=True, blank=True)
    theme_color_hash = models.CharField(_("Theme Color"), max_length=7, null=True, blank=True, unique=True)

    INCOME = "INC"
    EXPENSE = "EXP"
    TRANSFER = "TRN"
    CATEGORY_TYPE_CHOICE = {
        (INCOME, "Income"),
        (EXPENSE, "Expense"),
        (TRANSFER, "Transfer"),
    }

    category_type = models.CharField(
        max_length=3,
        choices=CATEGORY_TYPE_CHOICE,
        default=EXPENSE,
    )

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Category_detail", kwargs={"pk": self.pk})


class Transaction(models.Model):
    user_id = models.ForeignKey("auth.User", verbose_name=_("Owner"), on_delete=models.CASCADE)
    account_id = models.ForeignKey("account_management_api.Account", verbose_name=_("Account"), on_delete=models.CASCADE)
    category_id = models.ForeignKey("account_management_api.Category", verbose_name=_("Category"), on_delete=models.CASCADE)
    amount = models.IntegerField(_("Amount"))
    trn_date = models.DateTimeField(_("Transaction Date"), null=False, blank=False)
    note = models.TextField(_("Note"), null=True, blank=True)

    class Meta:
        verbose_name = _("Transaction")
        verbose_name_plural = _("Transactions")

    def __str__(self):
        return str(self.amount) + " in " + str(self.account_id)

    def get_absolute_url(self):
        return reverse("Transaction_detail", kwargs={"pk": self.pk})
